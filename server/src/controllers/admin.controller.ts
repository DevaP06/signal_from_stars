import { Request, Response } from 'express'
import { seedPuzzles } from '../scripts/seedData'

export async function seed(_req: Request, res: Response) {
  await seedPuzzles()
  return res.json({ status: 'ok', seeded: true })
}

