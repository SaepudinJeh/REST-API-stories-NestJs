import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { SocialMediaEntity } from './social.media.entity';

export class EditUserEntity {
  @IsMongoId()
  _id: mongoose.Types.ObjectId;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  linked: SocialMediaEntity;
}
