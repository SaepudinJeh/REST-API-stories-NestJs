import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models';
import { EditUserEntity, RegisterUserEntity } from '../models/entities';
import { SocialMediaService } from './media.social.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mediaSocialService: SocialMediaService,
  ) {}

  async registerUser(registerEntity: RegisterUserEntity): Promise<User> {
    try {
      const registerUser = new this.userModel(registerEntity);

      const result = await registerUser.save();
      const saveMediaSocial = await this.mediaSocialService.createMediaSocial(
        result._id,
      );

      console.log('save media social', saveMediaSocial);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findUser(findUser: any): Promise<any> {
    try {
      const result = await this.userModel
        .findOne({ ...findUser })
        .select('username email avatar bio password role');

      const mediaSocial = await this.mediaSocialService.findMediaSocial(
        result?._id,
      );

      return { data: result, linked: mediaSocial };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findUserId(id: string): Promise<any> {
    try {
      return await this.userModel
        .findById(id)
        .select('username email avatar bio role');
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async editProfile(editUserEntity: EditUserEntity): Promise<any> {
    try {
      const user = await this.userModel.findByIdAndUpdate(
        { _id: editUserEntity._id },
        { editUserEntity },
        { upsert: true },
      );
      // const linked = await this.mediaSocialService.updateLinked({
      //   authorId: user._id,
      //   facebook: editUserEntity.linked.facebook,
      //   twitter: editUserEntity.linked.twitter,
      // });

      console.log(user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
