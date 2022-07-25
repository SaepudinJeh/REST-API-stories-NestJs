import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Provider, Role } from 'src/utils';
import { AvatarImage } from '../dto';

import { RegisterDto } from '../dto/auth.register';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthRegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({
    description: 'This body payload register User',
    type: RegisterDto,
  })
  async registerUser(@Body() registerDto: RegisterDto, @Res() response: any) {
    try {
      console.log('payload', registerDto);

      const hashPassword = await bcrypt.hash(
        registerDto.password,
        parseInt(process.env.SALT_HASH),
      );

      await this.authService.registerUser({
        ...registerDto,
        username: registerDto.username.toLowerCase(),
        password: hashPassword,
        avatar: new AvatarImage(),
        bio: '',
        email_verified: false,
        provider: Provider.local,
        role: Role.User,
        linked: null,
      });

      response.json({
        message: 'Register Succesfully',
        statusCode: 201,
      });
    } catch (err) {
      console.log('error', err);
      response.status(400).json({
        statusCode: 400,
        message: `${
          err.keyValue.email || err.keyValue.username
        } already exist!`,
      });
    }
  }
}
