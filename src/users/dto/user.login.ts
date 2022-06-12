import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
