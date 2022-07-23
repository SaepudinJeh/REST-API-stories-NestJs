import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '../dto/auth.login';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
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
    try {
      const { email, password } = userLoginDto;

      const { data, linked } = await this.authService.findUser(email);

      if (!data && !linked) {
        return response.status(401).json({
          message: 'Unregistered Email!',
          statusCode: 401,
        });
      }

      const comparePassword = await bcrypt.compare(password, data.password);

      if (!comparePassword) {
        return response.status(401).json({
          message: 'Invalid Password',
          statusCode: 401,
        });
      }

      return response.status(200).json({
        statusCode: 200,
        user: {
          _id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          bio: data.bio,
          linked: linked,
        },
        access_token: this.jwtService.sign({
          id: data._id,
          email: data.email,
          role: data.role,
        }),
      });
    } catch (err) {
      return response.status(400).json({
        statusCode: 400,
        message: err,
      });
    }
  }
}
