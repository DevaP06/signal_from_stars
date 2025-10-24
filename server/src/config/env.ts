import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/signal_from_the_stars',
  JWT_SECRET: process.env.JWT_SECRET ?? 'change_me',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  GAME_ID: process.env.GAME_ID ?? 'default',
  ADMIN_TOKEN: process.env.ADMIN_TOKEN ?? '',
}
