import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'

export default function ResultsPage() {
  const { score, reset } = useGame()
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mission Complete</h2>
      <p>Your final score: {score}</p>
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

