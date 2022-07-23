import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Provider, Role } from 'src/utils';

class AvatarImage {
  provider: string = null;

  ImageUrl: string = null;
}

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

  @IsNotEmpty()
  avatar: AvatarImage;

  @IsNotEmpty()
  bio: string = null;

  @IsNotEmpty()
  email_verified = false;

  @IsNotEmpty()
  @IsEnum(Provider)
  provider: Provider = Provider.local;
}
