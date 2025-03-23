'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

type Props = {
  total: number
  correct: number
  reactionTimes: number[]
  retryAction: () => void
  mode?: 'fixed' | 'timed' // optional 구분용
}

const getMessageByAccuracy = (accuracy: number) => {
  if (accuracy >= 90) return '🎉 집중력 대장! 완벽에 가까운 성과예요.'
  if (accuracy >= 75) return '👍 아주 잘했어요! 꽤 집중력이 좋네요.'
  if (accuracy >= 50) return '🙂 괜찮아요! 조금 더 집중하면 좋아질 거예요.'
  return '😅 다음엔 더 집중해서 도전해봐요!'
}

export default function StroopResultSummary({
  total,
  correct,
  reactionTimes,
  retryAction,
  mode = 'fixed'
}: Props) {
  const router = useRouter()
  const accuracy = total ? Math.round((correct / total) * 100) : 0
  const avg =
    reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length || 0
  const min = Math.min(...reactionTimes)
  const max = Math.max(...reactionTimes)
  const format = (ms: number) => (ms / 1000).toFixed(2)
  const message = getMessageByAccuracy(accuracy)

  return (
    <motion.div
      className="space-y-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold text-highlight">
        {mode === 'timed' ? '⏰ 테스트 종료' : '✅ 테스트 완료!'}
      </h2>

      <div className="grid gap-2 text-sm text-gray-700 dark:text-gray-200">
        {mode === 'timed' && (
          <p>
            <span className="font-semibold">총 문제 수:</span> {total}
          </p>
        )}
        <p>
          <span className="font-semibold">정답 수:</span> {correct}
          {mode === 'fixed' && ` / ${total}`}
        </p>
        <p>
          <span className="font-semibold">정답률:</span> {accuracy}%
        </p>
        <p>
          <span className="font-semibold">평균 반응 시간:</span> {format(avg)}s
        </p>
        <p>
          <span className="font-semibold">가장 빠른 반응:</span> {format(min)}s
        </p>
        <p>
          <span className="font-semibold">가장 느린 반응:</span> {format(max)}s
        </p>
      </div>

      <motion.p
        className="mt-4 text-lg font-medium text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}>
        <span className={'break-keep'}>{message}</span>
      </motion.p>

      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <Button onClick={() => retryAction()}>다시 하기</Button>
        <Button
          variant="outline"
          onClick={() => router.replace('/projects/stroop-test/intro')}>
          처음으로
        </Button>
      </div>
    </motion.div>
  )
}
