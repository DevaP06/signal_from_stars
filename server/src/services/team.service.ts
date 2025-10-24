import { TeamModel } from '../models/Team'

export async function createTeam(gameId: string, name: string, tokenId: string) {
  return TeamModel.create({ gameId, name, tokenId })
}

export async function getTeamById(id: string) {
  return TeamModel.findById(id)
}

export async function updateTeamProgress(teamId: string, updates: Partial<{ score: number; currentMission: number; finishedAt: Date | null }>) {
  return TeamModel.findByIdAndUpdate(teamId, updates, { new: true })
}

export async function getLeaderboard(gameId: string) {
  return TeamModel.find({ gameId }).sort({ score: -1, updatedAt: 1 }).select('name score currentMission finishedAt')
}

export async function getTeamByName(gameId: string, name: string) {
  return TeamModel.findOne({ gameId, name })
}

export async function setTeamTokenId(teamId: string, tokenId: string) {
  return TeamModel.findByIdAndUpdate(teamId, { tokenId }, { new: true })
}
