import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TowerSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg: { type: String, required: true},
    location: { type: String, required: true},
    capacity: { type: Number, default: 100, required: true},
    startDate: { type: String, required: true},
    isCanceled: { type: Boolean, default: false, required: true},
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], default: 'concert', required:true},
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
