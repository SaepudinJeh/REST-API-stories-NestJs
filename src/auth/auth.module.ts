import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

import {
  AuthRegisterController,
  AuthLoginController,
  GoogleOauthController,
} from './controllers';

import { AuthService } from './services';
import { GoogleOauthStrategy, JwtStrategy } from './strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.SECRET_JWT,
          signOptions: {
            expiresIn: 60 * 60 * 24,
          },
        };
      },
    }),
  ],
  controllers: [
    AuthRegisterController,
    AuthLoginController,
    GoogleOauthController,
  ],
  providers: [AuthService, JwtStrategy, GoogleOauthStrategy],
})
export class AuthModule {}
