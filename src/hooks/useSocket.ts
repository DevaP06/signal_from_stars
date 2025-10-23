import { useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSession } from '../context/SessionContext'
import { useGame } from '../context/GameContext'

type GameState = { status: 'pending' | 'running' | 'ended'; startedAt?: string; endsAt?: string }
type Leader = { name: string; score: number; currentMission: number; finishedAt?: string }

export function useSocket() {
  const { session } = useSession()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [leaderboard, setLeaderboard] = useState<Leader[]>([])
  const { setScore, setProgress } = useGame()

  const url = (import.meta.env.VITE_WS_URL || '').replace(/\/+$/, '') || undefined

  useEffect(() => {
    if (!session) return
    const s = io(url ?? undefined, { autoConnect: true, transports: ['websocket', 'polling'] })
    setSocket(s)
    s.on('connect', () => {
      s.emit('join_game', { token: session.token })
    })
    s.on('joined', (payload: any) => {
      if (payload?.state) setGameState(payload.state)
      if (payload?.leaderboard) setLeaderboard(payload.leaderboard)
    })
    s.on('game_state', (state: GameState) => setGameState(state))
    s.on('leaderboard_update', ({ leaderboard: lb }: { leaderboard: Leader[] }) => setLeaderboard(lb))
    s.on('team_update', ({ score, currentMission }: { score: number; currentMission: number }) => {
      setScore(score)
      setProgress({ mission1: currentMission >= 1, mission2: currentMission >= 2, mission3: currentMission >= 3, mission4: currentMission >= 4 })
    })
    s.on('endgame', () => setGameState((g) => (g ? { ...g, status: 'ended' } : { status: 'ended' })))
    return () => {
      s.disconnect()
      setSocket(null)
    }
  }, [session])

  return useMemo(() => ({ socket, gameState, leaderboard }), [socket, gameState, leaderboard])
}
