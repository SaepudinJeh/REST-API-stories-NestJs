import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from '../dto/user.register';

import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    const registerUser = new this.userModel(registerUserDto);

    return await registerUser.save();
  }

  async findUserId(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
