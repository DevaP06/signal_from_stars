import { Router } from 'express'
import { joinRouter } from './join.routes'
import { puzzleRouter } from './puzzle.routes'
import { answerRouter } from './answer.routes'
import { leaderboardRouter } from './leaderboard.routes'
import { adminRouter } from './admin.routes'

export const apiRouter = Router()
apiRouter.use(joinRouter)
apiRouter.use(puzzleRouter)
apiRouter.use(answerRouter)
apiRouter.use(leaderboardRouter)
apiRouter.use(adminRouter)

