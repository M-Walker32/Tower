import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: {type: String, required: true},
    towerId: {type: Schema.Types.ObjectId, ref: 'Tower', required: true},
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
CommentSchema.virtual('tower', {
  localField: 'towerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Tower'
})
