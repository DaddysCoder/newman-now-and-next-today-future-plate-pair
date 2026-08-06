import { notFound } from 'next/navigation'

import { ProjectChapter } from '@/components/project-chapter'
import { isAuthoredProject, projects } from '@/content/projects'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.filter(isAuthoredProject).map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((entry) => entry.slug === slug)

  if (!project || !isAuthoredProject(project)) notFound()

  return <ProjectChapter project={project} />
}
