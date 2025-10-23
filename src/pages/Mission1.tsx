import localPuzzle from '../data/mission1.json'
import PuzzleCard from '../components/common/PuzzleCard'
import AnswerInput from '../components/forms/AnswerInput'
import { calculatePoints, addScore } from '../utils/scoring'
import { useGame } from '../context/GameContext'
import { useGameProgress } from '../hooks/useGameProgress'
import { useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { apiGetPuzzle, apiSubmitAnswer } from '../utils/api'

export default function Mission1() {
  const { score, setScore } = useGame()
  const { markComplete } = useGameProgress()
  const { session } = useSession()
  const [puzzle, setPuzzle] = useState<any>(localPuzzle)

  useEffect(() => {
    if (!session) return
    apiGetPuzzle(session.token, 1).then(setPuzzle).catch(() => setPuzzle(localPuzzle))
  }, [session])

  const submit = async (value: string) => {
    try {
      if (session) {
        const res = await apiSubmitAnswer(session.token, 1, value)
        setScore(res.newScore)
        if (res.correct) markComplete(1)
        alert(res.correct ? 'Correct!' : 'Try again.')
        return
      }
    } catch {}
    // Offline fallback scoring (uses old local logic): just acknowledge.
    const points = calculatePoints({ correct: true, timeSeconds: 0, basePoints: localPuzzle.points })
    setScore((s) => addScore(s, points))
    markComplete(1)
    alert('Answer submitted (offline mode).')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{puzzle.title ?? localPuzzle.title}</h2>
      <p className="opacity-80">{puzzle.description ?? localPuzzle.description}</p>
      <PuzzleCard title="Transmission">
        <p>{puzzle.question ?? localPuzzle.question}</p>
        <ul className="mt-2 list-disc list-inside text-sm opacity-80">
          {(puzzle.hints ?? localPuzzle.hints).map((h: string, i: number) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </PuzzleCard>
      <AnswerInput onSubmit={submit} placeholder="Decoded word" />
      <p className="text-sm opacity-80">Current score: {score}</p>
      <div className="flex gap-3">
        <a className="text-xs opacity-70 underline" href="/mission-2">Next: Mission 2 →</a>
      </div>
    </div>
  )
}
