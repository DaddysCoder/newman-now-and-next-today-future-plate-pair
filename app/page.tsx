import { ChapterRail } from '@/components/chapter-rail'
import { Compare } from '@/components/compare'
import { TopBar } from '@/components/top-bar'
import { aquaticCentre } from '@/content/projects'

export default function Page() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background">
      <TopBar />
      <main aria-label="Project content" className="flex min-h-0 flex-1">
        <Compare
          todaySrc={aquaticCentre.images.today}
          futureSrc={aquaticCentre.images.future}
          hotspots={aquaticCentre.hotspots}
          className="flex-1"
          priority
        />
      </main>
      <ChapterRail currentChapter={4} />
    </div>
  )
}
