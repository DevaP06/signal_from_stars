import { PuzzleModel } from '../models/Puzzle'
import { hashAnswer } from '../utils/hashing'

export async function getPuzzleForMission(gameId: string, missionId: number) {
  return PuzzleModel.findOne({ gameId, missionId }).select('-answerHash -answerSalt')
}

export async function validateAnswer(gameId: string, missionId: number, answer: string) {
  const p = await PuzzleModel.findOne({ gameId, missionId })
  if (!p) return { correct: false, points: 0 }
  const hash = hashAnswer(answer, p.answerSalt)
  return { correct: hash === p.answerHash, points: p.points ?? 0 }
}
