'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Info, MapPin } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { TopBar } from '@/components/top-bar'
import { projects, type Theme } from '@/content/projects'
import { cn } from '@/lib/utils'

const filters: { label: string; value: 'all' | Theme }[] = [
  { label: 'All', value: 'all' },
  { label: 'Water', value: 'water' },
  { label: 'Move', value: 'move' },
  { label: 'Green', value: 'green' },
  { label: 'Place', value: 'place' },
]

const points = [
  [14, 72], [23, 59], [32, 67], [43, 49], [55, 61], [65, 43], [77, 51],
  [84, 34], [72, 25], [58, 31], [46, 20], [31, 30], [18, 20],
] as const

export function ProjectsOverview() {
  const [filter, setFilter] = useState<'all' | Theme>('all')
  const [selected, setSelected] = useState(3)

  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
      <TopBar />
      <main className="flex flex-1 flex-col">
        <header className="flex flex-col gap-2 border-b border-rule px-5 py-5 md:px-8">
          <p className="text-[13px] font-extrabold tracking-[0.16em] text-earth uppercase">The complete journey</p>
          <h1 className="font-serif text-3xl font-semibold text-balance md:text-4xl">All projects</h1>
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">Explore thirteen future proposals as one connected, illustrative journey through Newman.</p>
        </header>
        <div className="grid flex-1 lg:grid-cols-[23rem_1fr]">
          <ProjectList filter={filter} setFilter={setFilter} selected={selected} setSelected={setSelected} />
          <ProjectMap filter={filter} selected={selected} setSelected={setSelected} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function ProjectList({ filter, setFilter, selected, setSelected }: {
  filter: 'all' | Theme
  setFilter: (value: 'all' | Theme) => void
  selected: number
  setSelected: (value: number) => void
}) {
  const visible = projects.map((project, index) => ({ project, index })).filter(({ project }) => {
    if (filter === 'all') return true
    return !('placeholder' in project) && project.theme === filter
  })

  return (
    <aside className="order-2 border-r border-rule bg-paper-warm lg:order-1">
      <div className="border-b border-rule p-5 md:p-6">
        <h2 className="text-[13px] font-extrabold tracking-[0.14em] uppercase">Filter by theme</h2>
        <div className="mt-3 flex flex-wrap gap-2" aria-label="Project theme filters">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => {
                setFilter(item.value)
                if (item.value !== 'all') {
                  const firstMatch = projects.findIndex((project) => !('placeholder' in project) && project.theme === item.value)
                  if (firstMatch >= 0) setSelected(firstMatch)
                }
              }}
              className={cn(
                'min-h-11 rounded-full border px-4 text-[13px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ember',
                filter === item.value ? 'border-forest bg-forest text-paper' : 'border-rule bg-paper text-ink hover:border-forest',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-[42rem] overflow-y-auto p-3 md:p-4">
        <p className="px-2 pb-3 text-[13px] text-ink-soft">{visible.length} of 13 chapters shown</p>
        {visible.length === 0 ? (
          <p className="rounded-md border border-rule bg-paper p-4 text-[14px] leading-relaxed text-ink-soft">No supplied projects have this theme yet. Placeholder chapters remain available under All.</p>
        ) : (
          <ol className="flex flex-col gap-2">
            {visible.map(({ project, index }) => {
              const active = selected === index
              return (
                <li key={project.slug}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(index)}
                    className={cn(
                      'flex min-h-16 w-full items-center gap-3 rounded-md border px-3 py-2 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ember',
                      active ? 'border-ember bg-paper shadow-sm' : 'border-transparent hover:border-rule hover:bg-paper',
                    )}
                  >
                    <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold', active ? 'bg-ember text-ink' : 'bg-forest text-paper')}>{index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-extrabold leading-snug">{project.name}</span>
                      <span className="mt-1 block text-[13px] text-ink-soft">Future proposal</span>
                    </span>
                    {active && <MapPin aria-hidden="true" className="size-4 text-earth" />}
                  </button>
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </aside>
  )
}

function ProjectMap({ filter, selected, setSelected }: {
  filter: 'all' | Theme
  selected: number
  setSelected: (value: number) => void
}) {
  const project = projects[selected]
  const [, y] = points[selected]
  const visiblePins = projects.map((entry, index) => ({ entry, index })).filter(({ entry }) => filter === 'all' || (!('placeholder' in entry) && entry.theme === filter))

  return (
    <section className="order-1 flex min-h-[32rem] flex-col bg-forest text-paper lg:order-2" aria-labelledby="map-title">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-paper/15 px-5 py-4 md:px-8">
        <div>
          <p className="text-[13px] font-bold tracking-[0.14em] text-ember-lit uppercase">Illustrative plan</p>
          <h2 id="map-title" className="mt-1 font-serif text-2xl font-semibold">One connected route</h2>
        </div>
        <div className="flex max-w-md gap-2 rounded-md border border-paper/15 bg-paper/10 p-3 text-[13px] leading-relaxed text-paper/75">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember-lit" />
          <p>All 13 are future proposals. None are approved or funded. Locations shown are illustrative and not to scale.</p>
        </div>
      </div>

      <div className="relative min-h-[28rem] flex-1 overflow-hidden bg-forest" aria-label="Illustrative map of thirteen project chapters">
        <svg viewBox="0 0 100 82" className="absolute inset-0 size-full" role="img" aria-labelledby="plan-title plan-desc" preserveAspectRatio="xMidYMid slice">
          <title id="plan-title">Illustrative Newman project journey</title>
          <desc id="plan-desc">A non-geographic plan with ranges, streets, a watercourse, green areas and a dotted route connecting thirteen chapter markers.</desc>
          <rect width="100" height="82" fill="var(--forest)" />
          <path d="M0 15 Q12 4 24 12 T48 10 T74 13 T100 7 V0 H0Z" fill="var(--earth)" opacity=".68" />
          <path d="M0 21 Q14 9 29 18 T58 16 T83 19 T100 14" fill="none" stroke="var(--ember-lit)" strokeWidth="1" opacity=".35" />
          <path d="M-5 67 C18 57 30 69 48 57 S78 41 105 51" fill="none" stroke="var(--water)" strokeWidth="2.5" opacity=".55" />
          <g stroke="var(--paper)" strokeWidth=".45" opacity=".22">
            <path d="M8 28 L94 69 M5 47 L89 18 M15 75 L71 17 M29 78 L96 30 M3 35 L86 75" />
            <path d="M11 24 L88 24 M7 39 L97 39 M4 55 L91 55 M21 70 L94 70" />
          </g>
          <g fill="var(--forest-lit)" opacity=".85">
            <path d="M8 31 Q15 24 22 31 T35 30 Q31 40 18 39 T8 31" />
            <path d="M67 61 Q74 53 83 58 T96 63 Q88 73 76 70 T67 61" />
            <path d="M70 25 Q78 18 89 24 Q86 34 75 34Z" />
          </g>
          <polyline points={points.map(([px, py]) => `${px},${py}`).join(' ')} fill="none" stroke="var(--ember)" strokeWidth="1" strokeDasharray="1.6 2.3" strokeLinecap="round" />
        </svg>

        {visiblePins.map(({ index }) => {
          const [pinX, pinY] = points[index]
          const active = selected === index
          return (
            <button
              key={index}
              type="button"
              aria-label={`Select chapter ${index + 1}: ${projects[index].name}`}
              aria-pressed={active}
              onClick={() => setSelected(index)}
              style={{ left: `${pinX}%`, top: `${pinY}%` }}
              className={cn(
                'absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[13px] font-extrabold shadow-lg outline-none transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:ring-2 focus-visible:ring-paper',
                active ? 'border-paper bg-ember text-ink' : 'border-paper/80 bg-forest text-paper',
              )}
            >
              {index + 1}
            </button>
          )
        })}

        {visiblePins.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="max-w-sm rounded-lg bg-paper-warm p-5 text-center text-[14px] leading-relaxed text-ink shadow-2xl">
              No supplied projects have this theme yet. Choose All or Water to continue exploring.
            </p>
          </div>
        )}

        <div
          style={{ top: `${y < 38 ? y + 8 : y - 26}%` }}
          className={cn('absolute left-1/2 w-[min(19rem,calc(100%-2rem))] -translate-x-1/2 rounded-lg bg-paper-warm p-4 text-ink shadow-2xl', visiblePins.length === 0 && 'hidden')}
          aria-live="polite"
        >
          <p className="text-[13px] font-extrabold tracking-[0.12em] text-earth uppercase">Chapter {selected + 1}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold">{project.name}</h3>
          <p className="mt-2 text-[13px] font-bold text-ink-soft">Future proposal</p>
          {'placeholder' in project ? (
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">Project theme, location and details are awaiting supply.</p>
          ) : (
            <Link href={`/projects/${project.slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-forest px-4 text-[13px] font-extrabold text-paper outline-none focus-visible:ring-2 focus-visible:ring-ember">
              Open project <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
