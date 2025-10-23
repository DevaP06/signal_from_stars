import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env'
import { apiRouter } from './routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()
app.use(helmet())

function normalizeOrigin(o?: string | null) {
  if (!o) return ''
  return o.replace(/\/+$/, '')
}

const allowedOrigins = normalizeOrigin(env.CORS_ORIGIN)
  .split(',')
  .map((s) => normalizeOrigin(s.trim()))
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      const reqOrigin = normalizeOrigin(origin || '')
      if (!reqOrigin) return callback(null, true) // same-origin or non-browser requests
      if (allowedOrigins.includes('*') || allowedOrigins.includes(reqOrigin)) return callback(null, true)
      return callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  })
)
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api', apiRouter)
app.use(errorHandler)

export default app
