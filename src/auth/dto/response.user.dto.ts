import { IsEmail, IsMongoId, IsObject, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class ResponseDto {
  @IsMongoId()
  _id: mongoose.Types.ObjectId;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsObject()
  avatar: [];

  @IsString()
  bio: string;

  @IsObject()
  linked: [];
}
