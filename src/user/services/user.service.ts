import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveUser } from '../dto/saveUser.dto';
import { User, UserDocument } from '../models';
import { SocialMediaService } from './media.social.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mediaSocialService: SocialMediaService,
  ) {}

  async registerUser(saveUser: SaveUser): Promise<User> {
    const registerUser = new this.userModel(saveUser);

    return await registerUser.save();
  }

  async findUser(findUser: any): Promise<any> {
    try {
      const result = await this.userModel
        .findOne({ ...findUser })
        .select('_id username email avatar bio');
      const mediaSocial = await this.mediaSocialService.findMediaSocial(
        result?._id,
      );
      return { result, linked: mediaSocial };
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
