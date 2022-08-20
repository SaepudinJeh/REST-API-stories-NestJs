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

      const dataUser = await this.authService.oauthLogin({
        ...oauthLoginDto,
        username: randomUsername,
        password: '',
        role: Role.User,
        bio: '',
        linked: null,
      });

      return await res.status(200).json({
        statusCode: 200,
        user: {
          _id: dataUser?._id,
          username: dataUser?.username,
          email: dataUser?.email,
          avatar: dataUser?.avatar,
          bio: dataUser?.bio,
          linked: dataUser?.linked,
        },
        access_token: this.jwtService.sign({
          _id: dataUser?._id,
          email: dataUser?.email,
          role: dataUser?.role,
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
