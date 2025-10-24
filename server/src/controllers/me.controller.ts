import { Request, Response } from 'express'
import { getTeamById } from '../services/team.service'

export async function me(req: Request, res: Response) {
  if (!req.auth) return res.status(401).json({ error: 'Unauthorized' })
  const team = await getTeamById(req.auth.teamId)
  if (!team) return res.status(404).json({ error: 'Team not found' })
  return res.json({
    teamId: team.id,
    name: team.name,
    score: team.score ?? 0,
    currentMission: team.currentMission ?? 1,
    finishedAt: team.finishedAt ?? null,
  })
}

