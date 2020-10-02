export class CreateProjectDto {
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
