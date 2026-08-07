import { redirect } from 'next/navigation'

import { HotspotExplorer } from '@/components/hotspot-explorer'
import { isAuthoredProject, projects } from '@/content/projects'

export default function ComparePage() {
  return <HotspotExplorer project={aquaticCentre} />
}
