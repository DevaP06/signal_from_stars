import type { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import { env } from '../config/env'
import { WS_EVENTS } from './events'
import { verifyToken } from '../security/tokens'
import { getLeaderboard } from '../services/team.service'
import { getGameState } from '../services/game.service'

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: { origin: env.CORS_ORIGIN, methods: ['GET', 'POST'] },
  })

  io.on('connection', (socket) => {
    socket.on(WS_EVENTS.JOIN_GAME, async ({ token }: { token: string }) => {
      try {
        const payload = verifyToken(token)
        const room = `game:${payload.gameId}`
        socket.join(room)
        const [state, leaderboard] = await Promise.all([
          getGameState(payload.gameId),
          getLeaderboard(payload.gameId),
        ])
        socket.emit(WS_EVENTS.JOINED, {
          teamId: payload.teamId,
          gameId: payload.gameId,
          state: { status: state.status, startedAt: state.startedAt, endsAt: state.endsAt },
          leaderboard,
        })
      } catch {
        socket.emit('error', { error: 'Invalid token' })
      }
    })
  })

  return io
}

