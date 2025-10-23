import { connectMongo } from '../db/connect'
import { PuzzleModel } from '../models/Puzzle'
import { randomSalt, hashAnswer } from '../utils/hashing'
import { env } from '../config/env'

const puzzles = [
  {
    missionId: 1,
    title: 'Identify the Source',
    description: 'NASA intercepted a distorted starfield image. Can you identify the constellation?',
    hints: ['This constellation is named after a hunter.', 'One of its brightest stars is 642 light-years away.'],
    question: 'Which constellation and star does the signal refer to?',
    expectedAnswer: 'Orion - Betelgeuse',
    points: 20,
  },
  {
    missionId: 2,
    title: 'Decode the Message',
    description: 'The signal carries a binary sequence. Decode it to reveal the message.',
    hints: ['Think ASCII.', 'Look carefully — each 8 bits represents a character.'],
    question:
      '01010111 01000101 00100000 01000001 01010010 01000101 00100000 01001110 01001111 01010100 00100000 01000001 01001100 01001111 01001110 01000101',
    expectedAnswer: 'WE ARE NOT ALONE',
    points: 40,
  },
  {
    missionId: 3,
    title: 'Solve the Cosmic Equation',
    description: 'The transmission reveals a physics riddle.',
    hints: ['Use the escape velocity formula √(2GM/R).', 'Earth’s escape velocity is ~11.2 km/s.'],
    question: 'Which planet has an escape velocity of approximately 11.2 km/s?',
    expectedAnswer: 'Earth',
    points: 40,
  },
  {
    missionId: 4,
    title: 'The Final Transmission',
    description: 'The last part of the alien signal tests your cosmic knowledge.',
    hints: ['Think distance from Earth.', 'The Andromeda Galaxy is farthest away.'],
    question: 'Arrange in order of increasing distance from Earth: Moon, Sun, Andromeda Galaxy, Alpha Centauri',
    expectedAnswer: 'Moon < Sun < Alpha Centauri < Andromeda Galaxy',
    points: 50,
  },
]

export async function seedPuzzles() {
  // Ensure DB connection (no-op if already connected)
  await connectMongo()
  for (const p of puzzles) {
    const salt = randomSalt()
    const answerHash = hashAnswer(p.expectedAnswer, salt)
    await PuzzleModel.findOneAndUpdate(
      { gameId: env.GAME_ID, missionId: p.missionId },
      {
        gameId: env.GAME_ID,
        missionId: p.missionId,
        title: p.title,
        description: p.description,
        hints: p.hints,
        question: p.question,
        points: p.points,
        answerHash,
        answerSalt: salt,
      },
      { upsert: true }
    )
  }
}

