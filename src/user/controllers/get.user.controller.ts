import { Controller, Post, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';

@ApiTags('User')
@Controller('/v1/user')
export class GetUserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiQuery({ name: 'username' })
  @ApiOperation({ summary: 'Find User by Username' })
  async findUser(@Query() query: any, @Res() res: any) {
    try {
      const { data, linked } = await this.userService.findUser({
        username: query.username,
      });

      res.status(200).json({
        message: 'User Exist',
        statusCode: 200,
        user: {
          _id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          bio: data.bio,
          linked: linked,
        },
      });
    } catch (error) {
      console.log('Find user by username', error);
      res.json(error);
    }
  }
}
