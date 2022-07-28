import { Test, TestingModule } from '@nestjs/testing';

import { GetUserController } from '../../controllers';
import { UserService } from '../../services';

describe('Get User Controllers', () => {
  let getUserControllers: GetUserController;

  const mockUserService = {};

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GetUserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    getUserControllers = moduleRef.get<GetUserController>(GetUserController);
  });

  it('Should be defined', () => {
    expect(getUserControllers).toBeDefined();
  });
});
