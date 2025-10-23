export type ScoreEvent = {
  correct: boolean
  timeSeconds: number
  basePoints?: number
}

export function calculatePoints({ correct, timeSeconds, basePoints = 100 }: ScoreEvent): number {
  if (!correct) return 0
  const timeFactor = Math.max(0.4, 1 - timeSeconds / 300) // 5 minutes to floor at 40%
  return Math.round(basePoints * timeFactor)
}

export function addScore(current: number, delta: number): number {
  return Math.max(0, current + delta)
}

