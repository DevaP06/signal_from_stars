import http from 'http'
import app from './app'
import { env } from './config/env'
import { connectMongo } from './db/connect'
import { initSocket } from './ws/socket'
import { logger } from './config/logger'
import { seedPuzzles } from './scripts/seedData'

async function start() {
  await connectMongo()
  if (process.env.AUTO_SEED === 'true') {
    logger.info('AUTO_SEED enabled: seeding puzzles...')
    try {
      await seedPuzzles()
      logger.info('Seeding complete')
    } catch (e) {
      logger.error('Seeding failed', e)
    }
  }
  const server = http.createServer(app)
  initSocket(server)
  server.listen(env.PORT, () => logger.info(`Server listening on :${env.PORT}`))
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
