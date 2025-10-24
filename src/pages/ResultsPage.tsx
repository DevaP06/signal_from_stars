import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useGame } from '../context/GameContext'
// @ts-ignore - type provided by package when installed
import confetti from 'canvas-confetti'

export default function ResultsPage() {
  const { score, reset } = useGame()
  useEffect(() => {
    try {
      const duration = 1500
      const end = Date.now() + duration
      ;(function frame() {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } })
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } })
        if (Date.now() < end) requestAnimationFrame(frame)
      })()
    } catch {}
  }, [])
  return (
    <div className="space-y-4">
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
