import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/schemas';
import { EditUserEntity, RegisterUserEntity } from '../models/entities';
import { SocialMediaService } from './media.social.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private mediaSocialService: SocialMediaService,
  ) {}

  async saveUser(registerEntity: RegisterUserEntity): Promise<User> {
    const registerUser = new this.userModel(registerEntity);

    return await registerUser.save();
  }

  async findUser(findUser: any): Promise<any> {
    const result = await this.userModel
      .findOne({ ...findUser })
      .select('username email avatar bio password role linked');

    return result;
  }

  async findUserId(id: string): Promise<any> {
    return await this.userModel
      .findById(id)
      .select('username email avatar bio role');
  }

  async editProfile(editUserEntity: EditUserEntity): Promise<any> {
    const user = await this.userModel.findByIdAndUpdate(
      { _id: editUserEntity._id },
      { editUserEntity },
      { upsert: true },
    );

    return user;
    // const linked = await this.mediaSocialService.updateLinked({
    //   authorId: user._id,
    //   facebook: editUserEntity.linked.facebook,
    //   twitter: editUserEntity.linked.twitter,
    // });
  }
}
