import { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  name: String,
  description: String,
  url: String,
  isLookingForContributors: Boolean,
  creator: Schema.Types.ObjectId,
  contributors: [Schema.Types.ObjectId],
});
