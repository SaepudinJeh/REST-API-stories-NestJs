import { Controller, Post, Query, Response } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { UserService } from 'src/user/services/user.service';
import { StoriesService } from '../services/stories.service';

@Controller('v1')
export class GetStoriesController {
  constructor(
    private storiesService: StoriesService,
    private userService: UserService,
  ) {}

  @Post('get/stories')
  @ApiOperation({ summary: 'Get All stories By Username' })
  async getStoriesByUsername(
    @Query('user') query: string,
    @Response() res: any,
  ) {
    try {
      const user = await this.userService.findUser({
        username: query.toLowerCase(),
      });

      console.log(user);

      if (!user) {
        return res.status(400).json({
          statusCode: 400,
          message: 'User not registered!',
        });
      } else {
        const data = await this.storiesService.getStoriesByUser(user._id);

        console.log({ data });

        return res.status(200).json({
          statusCode: 200,
          message: 'Successfully',
          data,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        statusCode: 400,
        message: 'Cant result story :(',
      });
    }
  }
}
