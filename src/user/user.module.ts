import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EditUserController, GetUserController } from './controllers';
import { MediaSocial, MediaSocialSchema, User, UserSchema } from './models';
import { RegisterUserEntity } from './models/entities/register.entity';
import { SocialMediaService, UserService } from './services';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: MediaSocial.name, schema: MediaSocialSchema },
    ]),
  ],
  providers: [UserService, SocialMediaService, RegisterUserEntity],
  controllers: [GetUserController, EditUserController],
  exports: [UserService, RegisterUserEntity],
})
export class UserModule {}
