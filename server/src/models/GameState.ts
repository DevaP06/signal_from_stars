import { Schema, model, InferSchemaType } from 'mongoose'

const GameStateSchema = new Schema(
  {
    gameId: { type: String, unique: true, required: true },
    status: { type: String, enum: ['pending', 'running', 'ended'], default: 'pending' },
    startedAt: { type: Date },
    endsAt: { type: Date },
  },
  { timestamps: true }
)

export type GameState = InferSchemaType<typeof GameStateSchema>
export const GameStateModel = model('GameState', GameStateSchema)

