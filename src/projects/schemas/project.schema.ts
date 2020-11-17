import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  name: String,
  description: String,
  url: String,
  isLookingForContributors: {
    type: Boolean,
    default: false,
  },
  creator: Schema.Types.ObjectId,
  contributors: [Schema.Types.ObjectId],
});
