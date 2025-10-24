import { Router } from 'express'
import { endgame } from '../controllers/endgame.controller'
import { seed } from '../controllers/admin.controller'
import { adminAuth } from '../middleware/adminAuth'

export const adminRouter = Router()
adminRouter.post('/endgame', endgame)
adminRouter.post('/seed', adminAuth, seed)
