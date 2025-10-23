import { Router } from 'express'
import { endgame } from '../controllers/endgame.controller'

export const adminRouter = Router()
adminRouter.post('/endgame', endgame)

