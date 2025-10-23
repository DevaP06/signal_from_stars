import { Request, Response } from 'express'
import { getPuzzleForMission } from '../services/puzzle.service'
import { getTeamById } from '../services/team.service'

export async function getPuzzle(req: Request, res: Response) {
  const missionId = Number(req.params.mission)
  if (!req.auth) return res.status(401).json({ error: 'Unauthorized' })
  const team = await getTeamById(req.auth.teamId)
  if (!team) return res.status(404).json({ error: 'Team not found' })
  if (missionId > (team.currentMission ?? 1)) return res.status(403).json({ error: 'Mission locked' })
  const puzzle = await getPuzzleForMission(req.auth.gameId, missionId)
  if (!puzzle) return res.status(404).json({ error: 'Puzzle not found' })
  return res.json(puzzle)
}
