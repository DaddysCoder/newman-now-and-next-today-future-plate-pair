import { ArrowRight, Droplets, Footprints, Leaf, Waves } from 'lucide-react'
import Link from 'next/link'

import { ChapterRail } from '@/components/chapter-rail'
import { Compare } from '@/components/compare'
import { TopBar } from '@/components/top-bar'
import type { Project } from '@/content/projects'

const outcomeIcons = [Waves, Droplets, Leaf]

export function ProjectChapter({ project }: { project: Project }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <TopBar activeProjectSlug={project.slug} />
      <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <article className="flex w-full shrink-0 flex-col bg-paper-warm text-ink lg:w-[400px]">
          <div className="flex flex-1 flex-col gap-8 px-6 py-8 md:px-8 lg:overflow-y-auto lg:py-10">
            <header className="flex flex-col gap-5">
              <span className="flex size-14 items-center justify-center rounded-full bg-water text-paper">
                <Waves aria-hidden="true" className="size-7" />
              </span>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-extrabold tracking-[0.16em] text-water-deep uppercase">
                  Chapter {String(project.chapter).padStart(2, '0')} · {project.status}
                </p>
                <h1 className="text-balance font-serif text-4xl font-semibold leading-tight md:text-5xl">
                  {project.name}
                </h1>
                <p className="text-pretty leading-relaxed text-ink-soft">{project.summary}</p>
              </div>
            </header>

            <section aria-labelledby="outcomes-heading" className="flex flex-col gap-4">
              <h2 id="outcomes-heading" className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
                What this could bring
              </h2>
              <ul className="flex flex-col gap-4">
                {project.outcomes.map((outcome, index) => {
                  const Icon = outcomeIcons[index] ?? Footprints
                  return (
                    <li key={outcome.title} className="flex gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-water/10 text-water-deep">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span>
                        <strong className="block text-sm font-extrabold">{outcome.title}</strong>
                        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{outcome.body}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>

            <div className="mt-auto flex flex-col gap-3">
              <Link href={`/projects/${project.slug}/compare`} className="flex min-h-12 items-center justify-between gap-3 rounded-md bg-forest px-4 text-sm font-extrabold text-paper outline-none transition-colors hover:bg-forest-mid focus-visible:ring-2 focus-visible:ring-water focus-visible:ring-offset-2">
                Explore the proposal
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href={`/story/${project.slug}`} className="flex min-h-12 items-center justify-between gap-3 rounded-md border border-rule px-4 text-sm font-extrabold text-ink outline-none transition-colors hover:bg-water/10 focus-visible:ring-2 focus-visible:ring-water focus-visible:ring-offset-2">
                Follow the guided story
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <p className="text-xs leading-relaxed text-ink-soft">Indicative visualisation for discussion. Nothing shown is approved or built.</p>
            </div>
          </div>
        </article>

        <section aria-label="Compare the site today with the future proposal" className="flex min-h-[55svh] min-w-0 flex-1">
          <Compare todaySrc={project.images.today} futureSrc={project.images.future} className="flex-1" priority />
        </section>
      </main>
      <ChapterRail currentChapter={project.chapter} />
    </div>
  )
}
