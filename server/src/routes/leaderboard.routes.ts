import { Router } from 'express'
import { leaderboard } from '../controllers/leaderboard.controller'

export const leaderboardRouter = Router()
leaderboardRouter.get('/leaderboard', leaderboard)

