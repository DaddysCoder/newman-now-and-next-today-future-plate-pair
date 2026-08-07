'use client'

import {
  BookOpenText,
  Captions,
  CaptionsOff,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

import { StoryJourneyRail } from '@/components/story-journey-rail'
import type { Project } from '@/content/projects'
import { cn } from '@/lib/utils'

const WAVEFORM = [35, 52, 78, 46, 68, 88, 57, 38, 74, 92, 62, 44, 82, 54, 72, 96, 48, 66, 84, 40, 76, 58, 90, 50, 70, 42, 86, 64, 80, 56, 94, 46, 74, 60, 88, 52, 78, 44, 68, 84]

function formatTime(seconds: number) {
  const wholeSeconds = Math.max(0, Math.floor(seconds))
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, '0')}`
}

export function GuidedStory({ project }: { project: Project }) {
  const totalTime = (project.narration.at(-1)?.t ?? 0) + 11
  const [elapsed, setElapsed] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [captionsOn, setCaptionsOn] = useState(true)
  const [soundOn, setSoundOn] = useState(false)
  const [motionOff, setMotionOff] = useState(false)
  const [systemReducedMotion, setSystemReducedMotion] = useState(false)
  const transcriptRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activeIndex = useMemo(() => {
    let index = 0
    project.narration.forEach((line, lineIndex) => {
      if (elapsed >= line.t) index = lineIndex
    })
    return index
  }, [elapsed, project.narration])

  const activeLine = project.narration[activeIndex]
  const reducedMotion = motionOff || systemReducedMotion

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setSystemReducedMotion(query.matches)
    updatePreference()
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (!isPlaying) return

    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = Math.min(totalTime, current + 0.1)
        if (next >= totalTime) setIsPlaying(false)
        return next
      })
    }, 100)

    return () => window.clearInterval(timer)
  }, [isPlaying, totalTime])

  useEffect(() => {
    transcriptRefs.current[activeIndex]?.scrollIntoView({
      block: 'nearest',
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [activeIndex, reducedMotion])

  function seek(time: number) {
    setElapsed(Math.min(totalTime, Math.max(0, time)))
  }

  function togglePlayback() {
    if (elapsed >= totalTime) setElapsed(0)
    setIsPlaying((current) => !current)
  }

  const progress = (elapsed / totalTime) * 100

  return (
    <main className="relative isolate h-svh min-h-[42rem] overflow-hidden bg-background text-paper">
      <Image
        src={project.images.future}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          'story-scene object-cover',
          !reducedMotion && isPlaying && 'story-scene-playing',
        )}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background/65 via-transparent to-background/90" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-6">
        <Link
          href={`/projects/${project.slug}`}
          className="max-w-[min(32rem,60vw)] rounded-md border border-paper/15 bg-glass px-4 py-3 shadow-lg backdrop-blur-xl outline-none focus-visible:ring-2 focus-visible:ring-ember-lit"
        >
          <span className="block text-[13px] font-extrabold tracking-[0.14em] text-ember-lit uppercase">
            Chapter {String(project.chapter).padStart(2, '0')}
          </span>
          <span className="block truncate font-serif text-xl font-semibold">{project.name}</span>
        </Link>

        <div aria-label="Story accessibility controls" className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={motionOff}
            onClick={() => setMotionOff((current) => !current)}
            className="flex min-h-11 items-center gap-2 rounded-md border border-paper/15 bg-glass px-3 text-[13px] font-bold shadow-lg backdrop-blur-xl outline-none hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-ember-lit"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Reduced motion</span>
          </button>
          <Link
            href={`/read/${project.slug}`}
            className="flex min-h-11 items-center gap-2 rounded-md border border-paper/15 bg-glass px-3 text-[13px] font-bold shadow-lg backdrop-blur-xl outline-none hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-ember-lit"
          >
            <BookOpenText aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Text view</span>
          </Link>
        </div>
      </div>

      {captionsOn ? (
        <p
          aria-live="polite"
          className="absolute right-4 bottom-[21rem] left-4 mx-auto max-w-3xl rounded-md bg-background/80 px-5 py-3 text-center text-base font-semibold leading-relaxed shadow-xl backdrop-blur-md md:right-[24rem] md:bottom-44 md:left-6"
        >
          {activeLine.text}
        </p>
      ) : null}

      <aside
        aria-label="Narration transcript"
        className="absolute top-24 right-4 max-h-56 w-[min(22rem,calc(100%-2rem))] overflow-y-auto rounded-lg border border-paper/15 bg-glass p-3 shadow-2xl backdrop-blur-xl md:top-28 md:right-6 md:bottom-44 md:max-h-none md:w-80"
      >
        <h2 className="px-2 pb-2 font-serif text-lg font-semibold">Transcript</h2>
        <ol className="flex flex-col gap-1">
          {project.narration.map((line, index) => (
            <li key={line.t}>
              <button
                ref={(node) => { transcriptRefs.current[index] = node }}
                type="button"
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => seek(line.t)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md px-2 py-3 text-left text-[13px] leading-relaxed outline-none transition-colors hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-ember-lit',
                  index === activeIndex && 'bg-paper text-ink',
                )}
              >
                <span className={cn('shrink-0 font-mono font-bold', index === activeIndex ? 'text-earth' : 'text-ember-lit')}>
                  {formatTime(line.t)}
                </span>
                <span>{line.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </aside>

      <div className="absolute inset-x-0 bottom-0">
        <section aria-label="Narration controls" className="border-t border-paper/15 bg-glass px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="mx-auto flex max-w-[90rem] items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ember text-ink outline-none hover:bg-ember-lit focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {isPlaying ? <Pause aria-hidden="true" className="size-5" /> : <Play aria-hidden="true" className="size-5" />}
            </button>

            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-end justify-between gap-4">
                <p className="min-w-0 truncate text-[13px] font-bold">
                  <span className="text-paper/60">Now playing · </span>{activeLine.text}
                </p>
                <span className="shrink-0 font-mono text-[13px] text-paper/75">
                  {formatTime(elapsed)} / {formatTime(totalTime)}
                </span>
              </div>
              <div className="relative h-10">
                <div aria-hidden="true" className="absolute inset-0 flex items-center gap-1 overflow-hidden">
                  {WAVEFORM.map((height, index) => (
                    <span
                      key={index}
                      className={cn('w-1 flex-1 rounded-full', index / WAVEFORM.length * 100 <= progress ? 'bg-ember' : 'bg-paper/30')}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <input
                  type="range"
                  min={0}
                  max={totalTime}
                  step={0.1}
                  value={elapsed}
                  onChange={(event) => seek(Number(event.currentTarget.value))}
                  aria-label="Narration position"
                  aria-valuetext={`${formatTime(elapsed)} of ${formatTime(totalTime)}`}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:accent-ember"
                />
              </div>
            </div>

            <button
              type="button"
              aria-pressed={captionsOn}
              onClick={() => setCaptionsOn((current) => !current)}
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-md border border-paper/20 outline-none hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-ember-lit',
                captionsOn && 'bg-paper text-ink',
              )}
              aria-label={captionsOn ? 'Turn captions off' : 'Turn captions on'}
            >
              {captionsOn ? <Captions aria-hidden="true" className="size-5" /> : <CaptionsOff aria-hidden="true" className="size-5" />}
            </button>
            <button
              type="button"
              aria-pressed={soundOn}
              onClick={() => setSoundOn((current) => !current)}
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-md border border-paper/20 outline-none hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-ember-lit',
                soundOn && 'bg-paper text-ink',
              )}
              aria-label={`${soundOn ? 'Mute' : 'Enable'} sound simulation; narration audio is not yet supplied`}
            >
              {soundOn ? <Volume2 aria-hidden="true" className="size-5" /> : <VolumeX aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </section>
        <div className="overflow-x-auto">
          <StoryJourneyRail currentChapter={project.chapter} />
        </div>
      </div>
    </main>
  )
}
