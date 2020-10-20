import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: Number,
  projects: [{type: mongoose.Schema.Types.Number, ref: 'Project'}]
}, { _id: false });