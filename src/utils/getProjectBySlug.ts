import { projectsData } from '@/data/projects'

export function getProjectBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return projectsData.find(p => p.slug === slug)
}
