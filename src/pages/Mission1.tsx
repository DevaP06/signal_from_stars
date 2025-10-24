import localPuzzle from '../data/mission1.json'
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
import Toast from '../components/common/Toast'

export default function Mission1() {
  const { score, setScore } = useGame()
  const { markComplete } = useGameProgress()
  const { session } = useSession()
  const navigate = useNavigate()
  const [puzzle, setPuzzle] = useState<any>(localPuzzle)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [showErrorToast, setShowErrorToast] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    if (!session) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => setShowBanner(false), 1200)
    apiGetPuzzle(session.token, 1)
      .then((p) => {
        setPuzzle(p)
        setInfo(null)
      })
      .catch((e) => {
        setPuzzle(localPuzzle)
        setInfo('Could not load puzzle from server; showing local copy.')
      })
    return () => clearTimeout(timer)
  }, [session])

  const submit = async (value: string) => {
    if (!session) {
      setError('Please join the game first.')
      navigate('/')
      return
    }
    try {
      const res = await apiSubmitAnswer(session.token, 1, value)
      setScore(res.newScore)
      if (res.correct) markComplete(1)
      setError(null)
      setInfo(res.correct ? 'Correct! Mission unlocked.' : 'Incorrect answer. Try again.')
      if (!res.correct) {
        setShowErrorToast(true)
        setTimeout(() => setShowErrorToast(false), 1200)
      }
      if (res.correct && res.nextMissionUnlocked) {
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
          navigate('/mission-2')
        }, 900)
      }
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
      <AnswerInput onSubmit={submit} placeholder="Decoded word" />
      <p className="text-sm opacity-80">Current score: {score}</p>
      {/* "Next" link is redundant due to auto‑advance; keep hidden to prevent skipping */}
      <Toast open={showBanner} message="Mission 1" variant="info" />
      <Toast open={showToast} message="Correct! Moving to Mission 2" variant="success" offsetY={40} />
      <Toast open={showErrorToast} message="Incorrect. Try again." variant="error" offsetY={80} />
    </div>
  )
}
