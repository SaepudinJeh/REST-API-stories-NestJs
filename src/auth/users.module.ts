import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  AuthRegisterController,
  AuthLoginController,
} from './controllers/index';

import { AuthService } from './services/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthRegisterController, AuthLoginController],
  providers: [AuthService],
})
export class UsersModule {}
