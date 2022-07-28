import { InjectModel } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../models/schemas';
import { UserService } from '../../services';

describe('User Service', () => {
  let userService: UserService;

  // beforeEach(async () => {
  //   const moduleRef: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UserService,
  //       {
  //         provide: InjectModel(User.name),
  //         _,
  //         _,
  //       },
  //     ],
  //   }).compile();

  //   userService = moduleRef.get<UserService>(UserService);
  // });

  // it('Should be defined', () => {
  //   expect(userService).toBeDefined();
  // });
});
