export function calculateScoreDelta(correct: boolean, basePoints: number, elapsedSeconds: number) {
  if (!correct) return 0
  const timeFactor = Math.max(0.4, 1 - elapsedSeconds / (45 * 60))
  return Math.round((basePoints || 0) * timeFactor)
}
