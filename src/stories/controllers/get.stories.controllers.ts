import { Controller, Post, Query, Response } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from 'src/user/services/user.service';
import { StoriesService } from '../services/stories.service';

@ApiTags('Stories')
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
      const { data } = await this.userService.findUser({
        username: query.toLowerCase(),
      });

      if (!data) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Cant result story!',
        });
      } else {
        const result = await this.storiesService.getStoriesByUser(data._id);

        return res.status(200).json({
          statusCode: 200,
          message: 'Successfully',
          result,
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
