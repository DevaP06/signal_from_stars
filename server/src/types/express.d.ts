import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    auth?: {
      teamId: string
      gameId: string
      tokenId: string
    }
  }
}

