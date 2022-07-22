import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';

@ApiTags('User')
@Controller('v1/user')
export class EditUserController {
  constructor(private userService: UserService) {}
}
