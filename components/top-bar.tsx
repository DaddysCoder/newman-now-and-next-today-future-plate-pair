import { BookOpenText, Map } from 'lucide-react'
import Link from 'next/link'

export function TopBar() {
  return (
    <header className="border-b border-paper/15 bg-glass text-paper backdrop-blur-xl">
      <div className="flex min-h-18 items-center justify-between gap-4 px-4 md:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ember-lit"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-paper/20 bg-paper/10 font-serif text-lg font-semibold">
            N
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg font-semibold leading-tight">
              Newman: Now and Next
            </span>
            <span className="block truncate text-[13px] text-paper/70">
              Shire of East Pilbara
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-1 md:gap-2">
          <Link
            href="/projects"
            className="flex min-h-11 items-center gap-2 rounded-md px-3 text-[13px] font-bold text-paper/80 outline-none transition-colors hover:bg-paper/10 hover:text-paper focus-visible:ring-2 focus-visible:ring-ember-lit"
          >
            <Map aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">All projects</span>
          </Link>
          <Link
            href="/read/newman-aquatic-centre"
            className="flex min-h-11 items-center gap-2 rounded-md px-3 text-[13px] font-bold text-paper/80 outline-none transition-colors hover:bg-paper/10 hover:text-paper focus-visible:ring-2 focus-visible:ring-ember-lit"
          >
            <BookOpenText aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Text view</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
