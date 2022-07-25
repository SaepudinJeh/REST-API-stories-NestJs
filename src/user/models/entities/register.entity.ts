import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Provider, Role } from 'src/utils';
import * as mongoose from 'mongoose';
import { AvatarImage } from './avatar.entities';

export class RegisterUserEntity {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string = null;

  @IsOptional()
  role: string = Role.User;

  @IsOptional()
  avatar: any = AvatarImage;

  @IsOptional()
  bio: string = null;

  @IsNotEmpty()
  email_verified = false;

  @IsNotEmpty()
  @IsEnum(Provider)
  provider: Provider = Provider.local;

  @IsMongoId()
  @IsOptional()
  linked: mongoose.Types.ObjectId = null;
}
