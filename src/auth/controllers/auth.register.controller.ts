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
  async registerUser(@Body() registerDto: RegisterDto, @Res() response: any) {
    try {
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
    } catch (err) {
      return response.status(400).json({
        statusCode: 400,
        message: `${err.keyValue.email || err.keyValue.username} already exist!`
      })
    }
  }
}
