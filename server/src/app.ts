import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env'
import { apiRouter } from './routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()
app.use(helmet())
app.use(cors({ origin: env.CORS_ORIGIN }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api', apiRouter)
app.use(errorHandler)

export default app

