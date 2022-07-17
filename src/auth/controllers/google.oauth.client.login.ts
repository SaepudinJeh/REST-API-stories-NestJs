import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import { OauthLoginDto } from '../dto';
import { AuthService } from '../services';

@ApiTags('Oauth')
@Controller('oauth/login')
export class LoginOauthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Post()
  async loginOauth(
    @Body() oauthLoginDto: OauthLoginDto,
    @Req() req: Request,
    @Res() res: any,
  ) {
    try {
      const randomUsername = uniqueNamesGenerator({
        length: 2,
        separator: '',
        dictionaries: [colors, animals],
      });
      console.log(randomUsername);

      const dataUser = await this.authService.oauthLogin({
        ...oauthLoginDto,
        username: randomUsername,
      });

      console.log('user', dataUser);

      const { email, username, role, _id, bio, avatar } = dataUser;

      return res.json({
        user: { email, username, avatar, bio },
        access_token: this.jwtService.sign({ _id, email, role }),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        statusCode: 400,
        message:
          (error._message && error._message) ||
          `${
            (error?.keyValue?.email && 'Email') ||
            (error?.keyValue?.username && 'Username')
          } already exist!`,
      });
    }
  }
}
