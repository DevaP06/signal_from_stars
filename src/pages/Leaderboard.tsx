import { useEffect, useState } from 'react'
import { apiLeaderboard, LeaderboardEntry } from '../utils/api'
import { useSocket } from '../hooks/useSocket'

export default function Leaderboard() {
  const { leaderboard: liveLb } = useSocket()
  const [fallback, setFallback] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    apiLeaderboard().then((r) => setFallback(r.leaderboard)).catch(() => {})
  }, [])

  const data = liveLb.length ? liveLb : fallback

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Leaderboard</h2>
      <ul className="divide-y divide-white/10">
        {data.map((t, i) => (
          <li key={`${t.name}-${i}`} className="py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 text-right opacity-70">{i + 1}</span>
              <span>{t.name}</span>
            </div>
            <div className="text-sm opacity-80">Score: {t.score}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

