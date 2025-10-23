import { Request, Response } from 'express'
import { getTeamById, updateTeamProgress } from '../services/team.service'
import { validateAnswer } from '../services/puzzle.service'
import { calculateScoreDelta } from '../services/scoring.service'
import { SubmissionModel } from '../models/Submission'
import { getGameState } from '../services/game.service'

export async function submitAnswer(req: Request, res: Response) {
  const missionId = Number(req.params.mission)
  const { answer } = req.body as { answer?: string }
  if (!answer || typeof answer !== 'string') return res.status(400).json({ error: 'Answer required' })

  if (!req.auth) return res.status(401).json({ error: 'Unauthorized' })
  const team = await getTeamById(req.auth.teamId)
  if (!team) return res.status(404).json({ error: 'Team not found' })
  if (missionId !== (team.currentMission ?? 1)) return res.status(403).json({ error: 'Wrong mission' })

  const state = await getGameState(req.auth.gameId)
  const now = Date.now()
  const startedAt = state.startedAt ? state.startedAt.getTime() : now
  const elapsedSeconds = Math.max(0, Math.floor((now - startedAt) / 1000))

  const { correct, points } = await validateAnswer(req.auth.gameId, missionId, answer)
  const scoreDelta = calculateScoreDelta(correct, points, elapsedSeconds)

  await SubmissionModel.create({
    gameId: req.auth.gameId,
    teamId: team._id,
    missionId,
    answer,
    isCorrect: correct,
    scoreDelta,
  })

  let nextMissionUnlocked = false
  let newScore = team.score
  if (correct) {
    newScore = (team.score ?? 0) + scoreDelta
    const nextMission = (team.currentMission ?? 1) + 1
    const finishedAt = nextMission > 3 ? new Date() : null
    await updateTeamProgress(team.id, {
      score: newScore,
      currentMission: Math.min(nextMission, 3),
      finishedAt,
    })
    nextMissionUnlocked = nextMission <= 3
  }

  return res.json({ correct, scoreDelta, newScore, nextMissionUnlocked })
}
