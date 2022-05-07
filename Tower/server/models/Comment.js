import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: {type: String, required: true},
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
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
CommentSchema.virtual('event', {
  localField: 'evenntId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})
