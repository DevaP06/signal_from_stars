import crypto from 'crypto'

export function hashAnswer(answer: string, salt: string) {
  const normalized = answer.trim().toLowerCase()
  return crypto.createHash('sha256').update(salt + normalized).digest('hex')
}

export function randomSalt(bytes = 16) {
  return crypto.randomBytes(bytes).toString('hex')
}

