import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateStoryEntity {
  @IsNotEmpty()
  @IsMongoId()
  author: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  image: any = null;

  @IsDate()
  @IsOptional()
  createdStory: Date = new Date();
}
