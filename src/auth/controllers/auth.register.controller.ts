import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from '../dto/auth.register';
import { AuthService } from '../services/auth.service';

@Controller('v1/auth')
export class AuthRegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({
    description: 'This body payload register User',
    type: RegisterDto,
  })
  async registerUser(@Body() registerDto: RegisterDto, @Res() response) {
    const checkUserExist = await this.authService.findUserByEmail(
      registerDto.email,
    );

    if (checkUserExist) {
      return response.status(400).json({
        message: 'Email Already Exist!',
        statusCode: 400,
      });
    }

    const hashPassword = await bcrypt.hash(
      registerDto.password,
      parseInt(process.env.SALT_HASH),
    );

    await this.authService.registerUser({
      ...registerDto,
      password: hashPassword,
    });

    return response.json({
      message: 'Register Succesfully',
      statusCode: 201,
    });
  }
}
