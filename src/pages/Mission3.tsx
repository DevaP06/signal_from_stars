import localPuzzle from '../data/mission3.json'
import PuzzleCard from '../components/common/PuzzleCard'
import AnswerInput from '../components/forms/AnswerInput'
import { calculatePoints, addScore } from '../utils/scoring'
import { useGame } from '../context/GameContext'
import { useGameProgress } from '../hooks/useGameProgress'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { apiGetPuzzle, apiSubmitAnswer } from '../utils/api'
import Alert from '../components/common/Alert'

export default function Mission3() {
  const { score, setScore } = useGame()
  const { markComplete } = useGameProgress()
  const { session } = useSession()
  const navigate = useNavigate()
  const [puzzle, setPuzzle] = useState<any>(localPuzzle)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      navigate('/')
      return
    }
    apiGetPuzzle(session.token, 3)
      .then((p) => {
        setPuzzle(p)
        setInfo(null)
      })
      .catch(() => {
        setPuzzle(localPuzzle)
        setInfo('Could not load puzzle from server; showing local copy.')
      })
  }, [session])

  const submit = async (value: string) => {
    if (!session) {
      alert('Please join the game first.')
      navigate('/')
      return
    }
    try {
      const res = await apiSubmitAnswer(session.token, 3, value)
      setScore(res.newScore)
      if (res.correct) markComplete(3)
      setError(null)
      setInfo(res.correct ? 'Correct! Mission unlocked.' : 'Incorrect answer. Try again.')
    } catch (e) {
      setError((e as Error)?.message || 'Submission failed. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{puzzle.title ?? localPuzzle.title}</h2>
      <p className="opacity-80">{puzzle.description ?? localPuzzle.description}</p>
      {error && <Alert variant="error" message={error} />}
      {info && !error && <Alert variant={info.startsWith('Correct') ? 'success' : 'info'} message={info} />}
      <PuzzleCard title="Transmission">
        <p>{puzzle.question ?? localPuzzle.question}</p>
        <ul className="mt-2 list-disc list-inside text-sm opacity-80">
          {(puzzle.hints ?? localPuzzle.hints).map((h: string, i: number) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </PuzzleCard>
      <AnswerInput onSubmit={submit} placeholder="Sum of lengths" />
      <p className="text-sm opacity-80">Current score: {score}</p>
      <div className="flex gap-3">
        <Link className="text-xs opacity-70 underline" to="/mission-4">Next: Mission 4 →</Link>
      </div>
    </div>
  )
}
