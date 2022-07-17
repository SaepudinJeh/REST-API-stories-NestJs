import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
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
    const dataUser = await this.authService.oauthLogin(oauthLoginDto);

    const { email, username, role, _id, bio, avatar } = dataUser;

    return res.json({
      user: { email, username, avatar, bio },
      access_token: this.jwtService.sign({ _id, email, role }),
    });
  }
}
