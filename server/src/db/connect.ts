import mongoose from 'mongoose'
import { env } from '../config/env'
import { logger } from '../config/logger'

export async function connectMongo() {
  try {
    await mongoose.connect(env.MONGO_URI)
    logger.info('Connected to MongoDB')
  } catch (err) {
    logger.error('MongoDB connection error', err)
    throw err
  }
}

