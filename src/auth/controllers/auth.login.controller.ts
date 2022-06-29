import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '../dto/auth.login';
import { AuthService } from '../services/auth.service';

@Controller('v1/auth')
export class AuthLoginController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({
    description: 'This body payload login User',
    type: LoginDto,
  })
  async loginUser(@Body() userLoginDto: LoginDto, @Res() response: any) {
    const { email, password } = userLoginDto;

    const checkUserExist = await this.authService.findUserByEmail(email);

    const comparePassword = await bcrypt.compare(
      password,
      checkUserExist.password,
    );

    if (!checkUserExist) {
      return response.status(401).json({
        message: 'Unregistered Email!',
        statusCode: 401,
      });
    }

    if (!comparePassword) {
      return response.status(401).json({
        message: 'Invalid Password',
        statusCode: 401,
      });
    }

    return response.status(200).json({
      statusCode: 200,
      access_token: this.jwtService.sign({
        id: checkUserExist._id,
        email: checkUserExist.email,
        role: checkUserExist.role,
      }),
    });
  }
}
