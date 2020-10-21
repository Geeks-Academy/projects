import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
      _id: Number,
      name: String,
      description: String,
      url: String,
      isLookingForContributors: Boolean,
      creator: {type: mongoose.Schema.Types.Number, ref: 'User'},
      contributors: [{type: mongoose.Schema.Types.Number, ref: 'User'}]
    }, { _id: false });