import { ChapterRail } from '@/components/chapter-rail'
import { TopBar } from '@/components/top-bar'

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <TopBar />
      <main aria-label="Project content" className="flex-1" />
      <ChapterRail currentChapter={4} />
    </div>
  )
}
