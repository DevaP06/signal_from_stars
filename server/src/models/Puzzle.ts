import { Schema, model, InferSchemaType } from 'mongoose'

const PuzzleSchema = new Schema(
  {
    gameId: { type: String, index: true, required: true },
    missionId: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hints: { type: [String], default: [] },
    question: { type: String, required: true },
    points: { type: Number, default: 0 },
    answerHash: { type: String, required: true },
    answerSalt: { type: String, required: true },
    assets: { type: [String], default: [] },
  },
  { timestamps: true }
)

export type Puzzle = InferSchemaType<typeof PuzzleSchema>
export const PuzzleModel = model('Puzzle', PuzzleSchema)
