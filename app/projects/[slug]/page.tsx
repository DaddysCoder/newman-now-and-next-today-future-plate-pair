import { redirect } from 'next/navigation'

import { ProjectChapter } from '@/components/project-chapter'
import { isAuthoredProject, projects } from '@/content/projects'

export default function ProjectPage() {
  return <ProjectChapter project={aquaticCentre} />
}
