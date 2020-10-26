import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  projects: [{type: mongoose.Schema.Types.Number, ref: 'Project'}]
}, { _id: false });