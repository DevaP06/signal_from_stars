import { Request, Response } from 'express'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { env } from '../config/env'
import { issueToken } from '../security/tokens'
import { createTeam, getTeamByName, setTeamTokenId } from '../services/team.service'

const JoinSchema = z.object({ teamName: z.string().min(1).max(64) })

export async function join(req: Request, res: Response) {
  const parsed = JoinSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid team name' })
  const name = parsed.data.teamName.trim()
  const tokenId = nanoid()
  // Find existing team by name to restore progress, else create a new team
  let team = await getTeamByName(env.GAME_ID, name)
  if (team) {
    await setTeamTokenId(team.id, tokenId)
  } else {
    try {
      team = await createTeam(env.GAME_ID, name, tokenId)
    } catch (e: any) {
      // Handle race where another request created the same name
      if (e?.code === 11000) {
        team = await getTeamByName(env.GAME_ID, name)
      } else {
        throw e
      }
    }
  }
  if (!team) return res.status(500).json({ error: 'Unable to create or restore team' })
  const token = issueToken({ teamId: (team as any).id, gameId: env.GAME_ID, tokenId })
  return res.json({ teamId: (team as any).id, gameId: env.GAME_ID, token })
}
