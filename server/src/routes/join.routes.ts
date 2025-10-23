import { Router } from 'express'
import { join } from '../controllers/join.controller'

export const joinRouter = Router()
joinRouter.post('/join', join)

