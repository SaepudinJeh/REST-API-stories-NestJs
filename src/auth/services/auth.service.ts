import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserEntity } from 'src/user/models/entities';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dto/auth.login';
import { UserModel } from '../models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async registerUser(registerEntity: RegisterUserEntity): Promise<any> {
    return await this.userService.registerUser(registerEntity);
  }

  async oauthLogin(registerEntity: RegisterUserEntity): Promise<any> {
    const user = await this.userService.findUserByEmail(registerEntity.email);

    if (!user) {
      return await this.userService.registerUser(registerEntity);
    }

    return user;
  }

  async loginUser(loginDto: LoginDto): Promise<any> {
    return this.userService.findUser({ ...loginDto });
  }

  async findUserId(id: string): Promise<UserModel> {
    return await this.userService.findUserId(id);
  }

  async findUserByEmail(email: string): Promise<UserModel> {
    return await this.userService.findUserByEmail(email);
  }
}
