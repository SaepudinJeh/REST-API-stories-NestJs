import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveUser {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  email_verified: boolean;

  @IsOptional()
  provider: string;
}
