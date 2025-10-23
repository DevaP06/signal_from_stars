import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../security/tokens'

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  const token = header.slice('Bearer '.length)
  try {
    const payload = verifyToken(token)
    req.auth = payload
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

