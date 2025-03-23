// utils/getNewStroopPair.ts
import { COLORS } from '@/data/stroopGame/colors'

export function getNewStroopPair() {
  const wordColor = COLORS[Math.floor(Math.random() * COLORS.length)]
  let displayColor = COLORS[Math.floor(Math.random() * COLORS.length)]

  while (wordColor.name === displayColor.name) {
    displayColor = COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  return { wordColor, displayColor }
}
