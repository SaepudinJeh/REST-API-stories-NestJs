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
    return await this.userService.saveUser(registerEntity);
  }

  async oauthLogin(registerEntity: RegisterUserEntity): Promise<any> {
    const user = await this.userService.findUser({
      email: registerEntity.email,
    });

    console.log('oauth login', user);

    if (!user) {
      return await this.userService.saveUser(registerEntity);
    }

    return user;
  }

  async findUserId(id: string): Promise<any> {
    return await this.userService.findUserId(id);
  }

  async findUser(email: string): Promise<any> {
    return await this.userService.findUser({ email });
  }
}
