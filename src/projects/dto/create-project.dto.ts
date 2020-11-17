export class CreateProjectDto {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly isLookingForContributors: boolean;
  readonly creator: string;
  readonly contributors: string[];
}
