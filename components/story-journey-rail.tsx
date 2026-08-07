import { projects } from '@/content/projects'
import { cn } from '@/lib/utils'

export function StoryJourneyRail({ currentChapter }: { currentChapter: number }) {
  return (
    <nav aria-label="Story chapters" className="border-t border-paper/15 bg-glass/90 backdrop-blur-xl">
      <ol className="flex min-w-max items-start px-4 py-3 md:min-w-0 md:px-6">
        {projects.map((project, index) => {
          const chapter = index + 1
          const isCurrent = chapter === currentChapter
          const isComplete = chapter < currentChapter

          return (
            <li key={project.slug} className="relative flex min-w-20 flex-1 flex-col items-center gap-1.5 px-1">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-3 right-1/2 h-px w-full',
                    chapter <= currentChapter ? 'bg-ember' : 'bg-paper/20',
                  )}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  'relative flex size-6 items-center justify-center rounded-full border text-[13px] font-extrabold',
                  isCurrent && 'border-ember-lit bg-ember text-ink ring-4 ring-ember/20',
                  isComplete && 'border-ember bg-ember text-ink',
                  chapter > currentChapter && 'border-paper/30 bg-background text-paper/65',
                )}
              >
                {chapter}
              </span>
              <span
                className={cn(
                  'max-w-24 truncate text-[13px] font-bold',
                  chapter <= currentChapter ? 'text-paper' : 'text-paper/55',
                )}
              >
                {isCurrent ? project.name : `Chapter ${chapter}`}
              </span>
              {isCurrent ? <span className="sr-only">Current chapter</span> : null}
              {isComplete ? <span className="sr-only">Completed</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
