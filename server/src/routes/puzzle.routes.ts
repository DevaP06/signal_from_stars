import { Router } from 'express'
import { getPuzzle } from '../controllers/puzzle.controller'
import { auth } from '../middleware/auth'

export const puzzleRouter = Router()
puzzleRouter.get('/puzzle/:mission', auth, getPuzzle)

