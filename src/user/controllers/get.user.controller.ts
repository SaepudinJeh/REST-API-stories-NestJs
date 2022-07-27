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
      const result = await this.userService.findUser({
        username: query.username,
      });

      if (!result) {
        return res.status(400).json({
          message: 'User not exist!',
          statusCode: 400,
        });
      }

      return res.status(200).json({
        message: 'User Found!',
        statusCode: 200,
        user: {
          _id: result?._id,
          username: result?.username,
          email: result?.email,
          avatar: result?.avatar,
          bio: result?.bio,
          linked: result?.linked,
        },
      });
    } catch (error) {
      console.log('Error find user by username', error);
      return res.status(400).json({
        statusCode: 400,
        message: error,
      });
    }
  }
}
