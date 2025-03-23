'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getProjectBySlug } from '@/utils/getProjectBySlug'
import { motion } from 'framer-motion'

export default function Page() {
  const project = getProjectBySlug('stroop-test')

  if (!project) return notFound()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="space-y-6 p-8 text-center">
          <h2 className="break-keep text-2xl font-bold">{project.title}</h2>

          <p>
            스트룹 테스트는 뇌의{' '}
            <span className="font-medium text-primary">집중력</span>과{' '}
            <span className="font-medium text-primary">반응 속도</span>를
            측정하는 간단한 심리 실험입니다.
          </p>
          <p>글자의 의미와 실제 색상이 다를 때,</p>
          <p>우리는 얼마나 빠르고 정확하게 반응할 수 있을까요?</p>
          <p className="font-medium text-muted-foreground">
            지금 바로 10문제 또는 30초 모드로 도전해보세요!
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/projects/stroop-test/fixed">
            <Button variant="outline">✅ 10문제 모드</Button>
          </Link>
          <Link href="/projects/stroop-test/timed">
            <Button variant="outline">⏰ 30초 제한 모드</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
