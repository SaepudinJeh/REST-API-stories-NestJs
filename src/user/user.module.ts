import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EditUserController, GetUserController } from './controllers';
import { MediaSocial, MediaSocialSchema, User, UserSchema } from './models';
import { SocialMediaService, UserService } from './services';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: MediaSocial.name, schema: MediaSocialSchema },
    ]),
  ],
  providers: [UserService, SocialMediaService],
  controllers: [GetUserController, EditUserController],
  exports: [UserService],
})
export class UserModule {}
