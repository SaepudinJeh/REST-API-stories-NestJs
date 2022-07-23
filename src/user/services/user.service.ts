import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models';
import { RegisterUserEntity } from '../models/entities';
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
      return error;
    }
  }

  async findUser(findUser: any): Promise<any> {
    try {
      const result = await this.userModel
        .findOne({ ...findUser })
        .select('_id username email avatar bio');

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
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }
}
