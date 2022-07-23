import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'src/utils';

export class ImageDto {
  @ApiProperty({ type: String, default: null })
  provider: string;

  @ApiProperty({ type: String, default: null })
  ImageUrl: string;
}

export class OauthLoginDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty({ message: 'Email verified cannot be empty' })
  @ApiProperty({ type: Boolean })
  email_verified: boolean;

  @IsOptional()
  @ApiProperty({ type: ImageDto })
  avatar: ImageDto;

  @IsNotEmpty({ message: 'Provider cannot be empty' })
  @ApiProperty({ type: String, enum: Provider })
  provider: Provider;
}
