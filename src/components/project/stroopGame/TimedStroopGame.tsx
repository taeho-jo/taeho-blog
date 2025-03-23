'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getNewStroopPair } from '@/utils/projects/getNewStroopPair'
import StroopResultSummary from '@/components/project/stroopGame/StroopResultSummary'

export default function TimedStroopGame() {
  const TIME_LIMIT = 30 // seconds
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const [startTime, setStartTime] = useState<number | null>(Date.now())
  const [finished, setFinished] = useState(false)
  const [{ wordColor, displayColor }, setPair] = useState(getNewStroopPair)
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([])

  // 타이머
  useEffect(() => {
    if (finished) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [finished])

  // 새 문제를 낼 때 셔플된 선택지 저장
  useEffect(() => {
    const choices = [wordColor.name, displayColor.name]
    const shuffled = [...choices].sort(() => Math.random() - 0.5)
    setShuffledChoices(shuffled)
  }, [wordColor, displayColor])

  const handleAnswer = (answer: string) => {
    if (finished || !startTime) return

    const reaction = Date.now() - startTime
    setReactionTimes(prev => [...prev, reaction])

    if (answer === displayColor.name) {
      setScore(prev => prev + 1)
    }

    setTotal(prev => prev + 1)
    setPair(getNewStroopPair())
    setStartTime(Date.now())
  }

  // ✅ 다시 하기 로직
  const resetGame = () => {
    setTimeLeft(TIME_LIMIT)
    setScore(0)
    setTotal(0)
    setReactionTimes([])
    setStartTime(Date.now())
    setFinished(false)
    setPair(getNewStroopPair())
  }

  if (finished) {
    return (
      <StroopResultSummary
        total={total} // 풀었던 문제 수
        correct={score} // 정답 수
        reactionTimes={reactionTimes}
        retryAction={resetGame}
        mode="timed"
      />
    )
  }

  return (
    <div className="space-y-6 text-center">
      <h2
        className={
          timeLeft <= 10
            ? 'animate-pulse text-lg font-semibold text-red-500'
            : 'text-lg font-semibold'
        }>
        남은 시간: {timeLeft}s
      </h2>
      <div
        className="text-4xl font-bold"
        style={{ color: displayColor.hex }}>
        {wordColor.name}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {shuffledChoices.map((name, idx) => (
          <Button
            key={`${name}-${idx}`}
            onClick={() => handleAnswer(name)}>
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
