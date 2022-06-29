import { IsEmail, IsNotEmpty } from 'class-validator';

export class SaveUser {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
