import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from '../dto/auth.login';
import { RegisterDto } from '../dto/auth.register';

import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(registerDto: RegisterDto): Promise<User> {
    const registerUser = new this.userModel(registerDto);

    return await registerUser.save();
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    return this.userModel.findOne({ ...loginDto });
  }

  async findUserId(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
