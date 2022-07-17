import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveUser {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  email_verified: boolean;

  @IsOptional()
  provider: string;
}
