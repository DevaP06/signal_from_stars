import { GameStateModel } from '../models/GameState'

export async function getGameState(gameId: string) {
  let state = await GameStateModel.findOne({ gameId })
  if (!state) state = await GameStateModel.create({ gameId, status: 'pending' })
  return state
}

export async function endGame(gameId: string) {
  return GameStateModel.findOneAndUpdate({ gameId }, { status: 'ended' }, { new: true })
}

