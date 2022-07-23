import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/utils';
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
  async loginOauth(@Body() oauthLoginDto: OauthLoginDto, @Res() res: any) {
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
        password: '',
        role: Role.User,
        bio: '',
      });

      console.log('user', dataUser);

      const { data, linked } = dataUser;

      return res.json({
        user: {
          _id: data._id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          bio: data.bio,
          linked,
        },
        access_token: this.jwtService.sign({
          _id: data._id,
          email: data.email,
          role: data.role,
        }),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        statusCode: 400,
        message:
          (error._message && error._message) ||
          error ||
          `${
            (error?.keyValue?.email && 'Email') ||
            (error?.keyValue?.username && 'Username')
          } already exist!`,
      });
    }
  }
}
