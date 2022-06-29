import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveUser } from '../dto/saveUser.dto';
import { User, UserDocument } from '../models';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(saveUser: SaveUser): Promise<User> {
    const registerUser = new this.userModel(saveUser);

    return await registerUser.save();
  }

  async findUser(findUser: any): Promise<any> {
    return this.userModel.findOne({ ...findUser });
  }

  async findUserId(id: string): Promise<any> {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email });
  }
}
