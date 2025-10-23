import { Request, Response } from 'express'
import { env } from '../config/env'
import { getLeaderboard } from '../services/team.service'

export async function leaderboard(_req: Request, res: Response) {
  const list = await getLeaderboard(env.GAME_ID)
  return res.json({ leaderboard: list })
}

