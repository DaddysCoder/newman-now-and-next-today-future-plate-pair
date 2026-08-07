import { redirect } from 'next/navigation'
import { isAuthoredProject, projects } from '@/content/projects'

export default function ReadPage() {
  return <ProjectChapter project={aquaticCentre} />
}
