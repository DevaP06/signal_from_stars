import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useGame } from '../context/GameContext'
import Confetti from '../components/common/Confetti'

export default function ResultsPage() {
  const { score, reset } = useGame()
  useEffect(() => {}, [])
  return (
    <div className="space-y-4">
      <Confetti />
      <h2 className="text-xl font-semibold">🎉 Congratulations! You completed all missions.</h2>
      <p>Your final score: {score}</p>
      <p className="opacity-80">Enjoy the poppers and share your achievement!</p>
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded bg-signal text-black font-medium" onClick={reset}>
          Reset
        </button>
        <Link className="px-4 py-2 rounded border border-white/20" to="/">
          Back to Landing
        </Link>
      </div>
    </div>
  )
}
