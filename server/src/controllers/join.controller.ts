import { Request, Response } from 'express'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { env } from '../config/env'
import { issueToken } from '../security/tokens'
import { createTeam } from '../services/team.service'

const JoinSchema = z.object({ teamName: z.string().min(1).max(64) })

export async function join(req: Request, res: Response) {
  const parsed = JoinSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid team name' })
  const tokenId = nanoid()
  const team = await createTeam(env.GAME_ID, parsed.data.teamName, tokenId)
  const token = issueToken({ teamId: team.id, gameId: env.GAME_ID, tokenId })
  return res.json({ teamId: team.id, gameId: env.GAME_ID, token })
}

