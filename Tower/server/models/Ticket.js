import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    towerId: {type: Schema.Types.ObjectId, ref: 'Tower', required: true},
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TicketSchema.virtual('tower', {
  localField: 'towerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Tower'
})
