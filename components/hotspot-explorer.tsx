'use client'

import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Compare } from '@/components/compare'
import type { Hotspot, Project } from '@/content/projects'
import { cn } from '@/lib/utils'

export function HotspotExplorer({ project }: { project: Project }) {
  const [selected, setSelected] = useState<Hotspot | null>(null)

  function selectHotspot(hotspot: Hotspot) {
    setSelected(hotspot)
  }

  return (
    <main className="relative flex min-h-svh bg-background">
      <Compare
        todaySrc={project.images.today}
        futureSrc={project.images.future}
        hotspots={project.hotspots}
        selectedHotspotId={selected?.id}
        onHotspotSelect={selectHotspot}
        className="min-h-svh flex-1"
        priority
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 md:p-6">
        <Link
          href={`/projects/${project.slug}`}
          className="pointer-events-auto flex min-h-11 items-center gap-2 rounded-md border border-paper/20 bg-glass px-4 text-sm font-extrabold text-paper shadow-lg backdrop-blur-xl outline-none hover:bg-glass/80 focus-visible:ring-2 focus-visible:ring-ember-lit"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">{project.name}</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <p className="mt-14 rounded-md border border-paper/20 bg-glass px-4 py-3 text-right text-xs font-extrabold tracking-[0.14em] text-paper uppercase shadow-lg backdrop-blur-xl sm:mt-0">
          Chapter {String(project.chapter).padStart(2, '0')}
        </p>
      </div>

      <section aria-labelledby="changes-heading" className="absolute bottom-4 left-4 w-[min(22rem,calc(100%-2rem))] rounded-lg border border-paper/20 bg-glass p-4 text-paper shadow-2xl backdrop-blur-xl md:bottom-6 md:left-6 md:p-5">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-extrabold tracking-[0.14em] text-paper/65 uppercase">Future proposal</p>
          <h1 id="changes-heading" className="font-serif text-2xl font-semibold">What changes here</h1>
        </div>
        <ol className="mt-3 flex flex-col gap-1">
          {project.hotspots.map((hotspot, index) => {
            const isSelected = selected?.id === hotspot.id
            return (
              <li key={hotspot.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls="hotspot-annotation"
                  onClick={() => selectHotspot(hotspot)}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-3 rounded-md px-2 text-left text-sm font-bold outline-none transition-colors hover:bg-paper/10 focus-visible:ring-2 focus-visible:ring-ember-lit',
                    isSelected && 'bg-paper text-ink hover:bg-paper',
                  )}
                >
                  <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-full border border-paper/40 text-xs', isSelected && 'border-ember bg-ember')}>
                    {index + 1}
                  </span>
                  {hotspot.title}
                </button>
              </li>
            )
          })}
        </ol>
      </section>

      {selected ? (
        <aside id="hotspot-annotation" aria-live="polite" className="absolute top-24 right-4 w-[min(22rem,calc(100%-2rem))] rounded-lg bg-paper-warm p-5 text-ink shadow-2xl md:top-auto md:right-6 md:bottom-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-extrabold tracking-[0.14em] text-water-deep uppercase">Selected change</p>
              <h2 className="font-serif text-2xl font-semibold">{selected.title}</h2>
            </div>
            <button type="button" aria-label="Close selected change" onClick={() => setSelected(null)} className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink-soft outline-none hover:bg-water/10 focus-visible:ring-2 focus-visible:ring-water">
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <p className="mt-3 leading-relaxed text-ink-soft">{selected.body}</p>
        </aside>
      ) : null}
    </main>
  )
}
