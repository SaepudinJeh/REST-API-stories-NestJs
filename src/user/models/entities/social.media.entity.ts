import { IsMongoId, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class SocialMediaEntity {
  @IsMongoId()
  authorId: mongoose.Types.ObjectId;

  @IsString()
  facebook: string;

  @IsString()
  twitter: string;
}
