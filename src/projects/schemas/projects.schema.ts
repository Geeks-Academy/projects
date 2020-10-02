import * as mongoose from 'mongoose';

export const ProjectsSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  projects: [ new mongoose.Schema({
      _id: Number,
      name: String,
      ownerId: Number,
      description: String,
      url: String,
      collaborators: [
        {
          id: Number
        }
      ]
    }, { _id: false })
  ]
});