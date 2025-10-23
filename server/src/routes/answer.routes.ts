import { Router } from 'express'
import { submitAnswer } from '../controllers/answer.controller'
import { auth } from '../middleware/auth'
import { answerLimiter } from '../middleware/rateLimit'

export const answerRouter = Router()
answerRouter.post('/answer/:mission', auth, answerLimiter, submitAnswer)

