import { Schema, model, InferSchemaType } from 'mongoose'

const TeamSchema = new Schema(
  {
    gameId: { type: String, index: true, required: true },
    name: { type: String, required: true },
    score: { type: Number, default: 0 },
    currentMission: { type: Number, default: 1 },
    tokenId: { type: String, required: true, index: true },
    finishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export type Team = InferSchemaType<typeof TeamSchema>
export const TeamModel = model('Team', TeamSchema)

