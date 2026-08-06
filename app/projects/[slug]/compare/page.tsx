import { notFound } from 'next/navigation'

import { HotspotExplorer } from '@/components/hotspot-explorer'
import { isAuthoredProject, projects } from '@/content/projects'

type ComparePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.filter(isAuthoredProject).map((project) => ({ slug: project.slug }))
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params
  const project = projects.find((entry) => entry.slug === slug)

  if (!project || !isAuthoredProject(project)) notFound()

  return <HotspotExplorer project={project} />
}
