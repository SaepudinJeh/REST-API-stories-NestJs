import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OauthLoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  email_verified: boolean;

  @ApiProperty({ type: String })
  avatar: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, enum: ['jwt', 'google', 'facebook'] })
  provider: string;
}
