import { notFound } from 'next/navigation'
import { projectsData } from '@/data/projects'
import Counter from '@/components/project/Counter'
import TextCustomizer from '@/components/project/TextCustomizer'
import SubNavbar from '@/components/layout/SubNavbar'

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
  const project = projectsData.find(p => p.slug === slug)

  if (!project) return notFound()

  const DynamicComponent = project.componentKey
    ? componentMap[project.componentKey]
    : null

  return (
    <>
      <SubNavbar
        title={'뚝딱뚝딱'}
        subTitle={'개발하며 만든 것들을 모아 놓은 곳'}
      />
      <div className="prose dark:prose-invert">
        <h3>{project.title}</h3>
        <p>📅 날짜: {project.date}</p>
        <p>⏱️ 기간: {project.period}일</p>
        <p>{project.description}</p>

        {/* 👇 컴포넌트가 있으면 렌더링 */}
        {DynamicComponent && <DynamicComponent />}
      </div>
    </>
  )
}
