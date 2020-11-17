import {
  IsArray,
  IsBoolean,
  IsString,
  IsUrl,
  IsMongoId,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsUrl()
  readonly url: string;

  @IsBoolean()
  isLookingForContributors: boolean;

  @IsMongoId()
  readonly creator: string;

  @IsArray()
  readonly contributors: string[];
}
