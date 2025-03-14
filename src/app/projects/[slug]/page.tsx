import { notFound } from 'next/navigation'
import { projectsData } from '@/data/projects'
import Counter from '@/components/project/Counter'
import TextCustomizer from '@/components/project/TextCustomizer'
import SubNavbar from '@/components/layout/SubNavbar'
import { ProjectDataType } from '@/types'

const componentMap: Record<string, React.ComponentType | undefined> = {
  Counter: Counter,
  TextCustomizer: TextCustomizer
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project: ProjectDataType | null | undefined =
    projectsData &&
    projectsData.find(
      (projectData: ProjectDataType) => projectData && projectData.slug === slug
    )

  if (!project) return notFound()

  const DynamicComponent = project?.componentKey
    ? componentMap[project?.componentKey]
    : null

  return (
    <>
      <SubNavbar
        title={project?.title || ''}
        subTitle={project?.date || ''}
      />
      <div className="prose dark:prose-invert">
        <p>{project.description}</p>

        {/* 👇 컴포넌트가 있으면 렌더링 */}
        {DynamicComponent && <DynamicComponent />}
      </div>
    </>
  )
}
