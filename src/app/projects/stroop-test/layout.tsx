import { ReactNode } from 'react'
import SubNavbar from '@/components/layout/SubNavbar'
import { getProjectBySlug } from '@/utils/getProjectBySlug'
import { notFound } from 'next/navigation'

export default function StroopLayout({ mode }: { mode: ReactNode }) {
  const project = getProjectBySlug('stroop-test')

  if (!project) return notFound()

  return (
    <>
      <SubNavbar slug="stroop-test" />
      <div className="p-4">
        {/*{children}*/}
        {/* Parallel Routes 영역 (intro, fixed, timed) */}
        {mode}
      </div>
    </>
  )
}
