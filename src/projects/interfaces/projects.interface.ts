import { Document } from 'mongoose';

export interface Projects extends Document {
  readonly userId: number;
  readonly projects: [
    {
      readonly _id: number,
      readonly name: string,
      readonly ownerId: number,
      readonly description: string,
      readonly url: string,
      readonly collaborators: [
        {
          readonly id: number
        }
      ]
    }
  ]
}