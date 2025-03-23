'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getNewStroopPair } from '@/utils/projects/getNewStroopPair'
import StroopResultSummary from '@/components/project/stroopGame/StroopResultSummary'

export default function FixedStroopGame() {
  const TOTAL_ROUNDS = 10
  const [round, setRound] = useState(1)
  const [correct, setCorrect] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(Date.now())
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [{ wordColor, displayColor }, setPair] = useState(getNewStroopPair)

  const handleAnswer = (answer: string) => {
    if (!startTime) return

    const reaction = Date.now() - startTime
    setReactionTimes(prev => [...prev, reaction])

    if (answer === displayColor.name) {
      setCorrect(prev => prev + 1)
    }

    if (round === TOTAL_ROUNDS) {
      setFinished(true)
    } else {
      setPair(getNewStroopPair())
      setRound(prev => prev + 1)
      setStartTime(Date.now())
    }
  }

  const resetGame = () => {
    setRound(1)
    setCorrect(0)
    setStartTime(Date.now())
    setReactionTimes([])
    setFinished(false)
    setPair(getNewStroopPair())
  }

  if (finished) {
    return (
      <StroopResultSummary
        total={TOTAL_ROUNDS} // 풀었던 문제 수
        correct={correct} // 정답 수
        reactionTimes={reactionTimes}
        retryAction={resetGame}
      />
    )
  }

  const choices = [wordColor.name, displayColor.name]
  const shuffled = choices.sort(() => Math.random() - 0.5)

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-lg font-semibold">
        🧠 {round} / {TOTAL_ROUNDS} 문제
      </h2>
      <div
        className="text-4xl font-bold"
        style={{ color: displayColor.hex }}>
        {wordColor.name}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {shuffled.map((name, idx) => (
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
