import mongoose, { Schema, Model } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry {}

const EntrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  status: {
    type: String,
    enum:{
      values: ['pending', 'in-progress', 'finished'],
      message: 'enum validator failed for path {PATH} with value {VALUE}',
    },
    default: 'pending',
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default EntryModel;
