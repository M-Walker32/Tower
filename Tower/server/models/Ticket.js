import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Creator', required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  required: true,
  ref: 'Account'
})
TicketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  required: true,
  ref: 'Event'
})
TicketSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  required: true,
  ref: 'Account'
})