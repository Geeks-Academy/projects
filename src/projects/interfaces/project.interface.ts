import { Document } from 'mongoose';

export interface Project extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly isLookingForContributors: boolean;
  readonly creator: string;
  readonly contributors: string[];
  readonly created_at: Date;
  readonly updated_at: Date;
}
