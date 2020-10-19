import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: Number,
  projects: [Number]
}, { _id: false });