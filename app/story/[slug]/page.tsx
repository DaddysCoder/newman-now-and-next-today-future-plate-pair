import { redirect } from 'next/navigation'
import { isAuthoredProject, projects } from '@/content/projects'

export default function StoryPage() {
  return <HotspotExplorer project={aquaticCentre} />
}
