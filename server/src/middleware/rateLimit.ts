import rateLimit from 'express-rate-limit'

export const answerLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  message: { error: 'Too many submissions, slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
})

