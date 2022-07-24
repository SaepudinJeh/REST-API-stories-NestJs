import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsObject,
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

  @IsNotEmpty()
  @IsObject()
  image: any;

  @IsDate()
  @IsOptional()
  createdStory: Date = new Date();
}
