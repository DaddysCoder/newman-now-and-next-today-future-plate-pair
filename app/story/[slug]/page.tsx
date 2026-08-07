import { redirect } from 'next/navigation'
import { isAuthoredProject, projects } from '@/content/projects'

type StoryPageProps = {
  params: Promise<{ slug: string }>
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const project = projects.find((entry) => entry.slug === slug)

  if (!project || !isAuthoredProject(project)) {
    redirect('/projects/newman-aquatic-centre/compare')
  }

  redirect(`/projects/${slug}/compare`)
}
