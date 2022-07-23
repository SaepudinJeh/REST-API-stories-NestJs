import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @ApiProperty({ type: String })
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty({ type: String })
  password: string;
}
