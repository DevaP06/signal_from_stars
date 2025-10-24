import { Request, Response, NextFunction } from 'express'
import { env } from '../config/env'

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-admin-token') || ''
  if (!env.ADMIN_TOKEN) return res.status(500).json({ error: 'Admin not configured' })
  if (token !== env.ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' })
  next()
}

