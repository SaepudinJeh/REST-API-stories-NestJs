import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateStoryEntity {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsObject()
  image: any;

  @IsDate()
  @IsOptional()
  createdStory: Date = new Date();
}
