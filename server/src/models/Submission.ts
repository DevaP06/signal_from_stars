import { Schema, model, InferSchemaType, Types } from 'mongoose'

const SubmissionSchema = new Schema(
  {
    gameId: { type: String, index: true, required: true },
    teamId: { type: Types.ObjectId, ref: 'Team', required: true, index: true },
    missionId: { type: Number, required: true },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    scoreDelta: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export type Submission = InferSchemaType<typeof SubmissionSchema>
export const SubmissionModel = model('Submission', SubmissionSchema)

