import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from 'src/utils';

@ApiTags('Oauth')
@Controller('oauth/google')
export class GoogleOauthController {
  constructor(private jwtService: JwtService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleOauth() {
    // return req.user;
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    console.log('user', req.user);

    return res.json({
      access_token: this.jwtService.sign({
        data: req.user,
      }),
    });
  }
}
