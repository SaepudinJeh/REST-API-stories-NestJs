import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserEntity } from 'src/user/models/entities';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async registerUser(registerEntity: RegisterUserEntity): Promise<any> {
    try {
      return await this.userService.registerUser(registerEntity);
    } catch (error) {
      return error;
    }
  }

  async oauthLogin(registerEntity: RegisterUserEntity): Promise<any> {
    try {
      const user = await this.userService.findUser({
        email: registerEntity.email,
      });

      if (!user) {
        return await this.userService.registerUser(registerEntity);
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  async findUserId(id: string): Promise<any> {
    try {
      return await this.userService.findUserId(id);
    } catch (error) {
      return error;
    }
  }

  async findUser(email: string): Promise<any> {
    try {
      return await this.userService.findUser(email);
    } catch (error) {
      return error;
    }
  }
}
