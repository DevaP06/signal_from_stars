import { Router } from 'express'
import { me } from '../controllers/me.controller'
import { auth } from '../middleware/auth'

export const meRouter = Router()
meRouter.get('/me', auth, me)

