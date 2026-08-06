import { projects } from '@/content/projects'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type ChapterRailProps = {
  currentChapter?: number
}

export function ChapterRail({ currentChapter }: ChapterRailProps) {
  return (
    <nav
      aria-label="Project chapters"
      className="border-t border-paper/15 bg-forest text-paper"
    >
      <div className="relative overflow-x-auto px-4 py-4 md:px-8">
        <div className="absolute top-8 right-8 left-8 h-px bg-paper/20" aria-hidden="true">
          <span className="block h-full w-1/3 bg-ember shadow-[0_0_16px_var(--ember)]" />
        </div>
        <ol className="relative flex min-w-max items-start gap-3">
          {projects.map((project, index) => {
            const chapter = index + 1
            const isCurrent = chapter === currentChapter
            const isPlaceholder = 'placeholder' in project

            return (
              <li key={project.slug} className="w-36 md:w-40">
                <Link
                  href={`/projects/${project.slug}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'group flex min-h-18 flex-col gap-2 rounded-md px-3 py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ember-lit',
                    isCurrent ? 'bg-paper text-ink' : 'text-paper hover:bg-paper/10',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full border text-xs font-extrabold',
                      isCurrent
                        ? 'border-ember bg-ember text-ink'
                        : 'border-paper/30 bg-forest text-paper',
                    )}
                  >
                    {chapter}
                  </span>
                  <span className="line-clamp-2 text-[13px] font-bold leading-snug">
                    {project.name}
                  </span>
                  {isPlaceholder && (
                    <span className={cn('text-[11px] font-semibold uppercase tracking-[0.12em]', isCurrent ? 'text-ink-soft' : 'text-paper/55')}>
                      Awaiting details
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
