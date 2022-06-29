import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

import {
  AuthRegisterController,
  AuthLoginController,
} from './controllers/index';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
    }),
  ],
  controllers: [AuthRegisterController, AuthLoginController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
