import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
      _id: Number,
      name: String,
      description: String,
      url: String,
      isLookingForContributors: Boolean,
      creator: Number,
      contributors: [Number]
    }, { _id: false });