import jwt from 'jsonwebtoken'
import { env } from '../config/env'

type JwtPayload = { teamId: string; gameId: string; tokenId: string }

export function issueToken(payload: JwtPayload, ttlSeconds = 60 * 60 * 6) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: ttlSeconds })
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload & { iat: number; exp: number }
}

