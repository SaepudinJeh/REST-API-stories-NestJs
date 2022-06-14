import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from '../dto/user.login';
import { UsersService } from '../services/users.service';

@Controller('v1/login')
export class UserLoginController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({
    description: 'This body payload login User',
    type: LoginUserDto,
  })
  async loginUser(@Body() userLoginDto: LoginUserDto, @Res() response) {
    const { email, password } = userLoginDto;

    const checkUserExist = await this.userService.findUserByEmail(email);

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
      access_token: this.jwtService.sign({
        email: checkUserExist.email,
      }),
    });
  }
}
