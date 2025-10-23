import { useMemo } from 'react'
import { useGame } from '../context/GameContext'

export function useGameProgress() {
  const { progress, setProgress } = useGame()
  const completeCount = useMemo(() => Object.values(progress).filter(Boolean).length, [progress])
  const total = 4
  const percent = Math.round((completeCount / total) * 100)

  const markComplete = (mission: 1 | 2 | 3) => {
    setProgress((p) => ({ ...p, [`mission${mission}`]: true } as typeof p))
  }

  return { progress, completeCount, total, percent, markComplete }
}
