import React, { createContext, useContext, useMemo, useState } from 'react'

type Progress = {
  mission1: boolean
  mission2: boolean
  mission3: boolean
}

type GameContextValue = {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  progress: Progress
  setProgress: React.Dispatch<React.SetStateAction<Progress>>
  reset: () => void
}

const GameContext = createContext<GameContextValue | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0)
  const [progress, setProgress] = useState<Progress>({ mission1: false, mission2: false, mission3: false })

  const reset = () => {
    setScore(0)
    setProgress({ mission1: false, mission2: false, mission3: false })
  }

  const value = useMemo(() => ({ score, setScore, progress, setProgress, reset }), [score, progress])
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}

