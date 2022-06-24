import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

import {
  AuthRegisterController,
  AuthLoginController,
} from './controllers/index';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_JWT
    }),
  ],
  controllers: [AuthRegisterController, AuthLoginController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
