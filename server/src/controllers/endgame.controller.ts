import { Request, Response } from 'express'
import { endGame } from '../services/game.service'

export async function endgame(_req: Request, res: Response) {
  const state = await endGame('default')
  return res.json({ status: state?.status ?? 'ended' })
}

