import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils';
import { StoriesService } from '../services/stories.service';
import { CreateStoryDto } from '../dto/createStory.dto';

@ApiTags('Stories')
@Controller('v1')
export class CreateStoryController {
  constructor(private storiesService: StoriesService) {}

  // @UseGuards(GoogleOauthGuard)
  @UseGuards(JwtAuthGuard)
  @Post('post/stories')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'POST Stories' })
  async createStories(
    @Body() storyDto: CreateStoryDto,
    @Request() req: any,
    @Res() res: any,
  ) {
    try {
      const result = await this.storiesService.createStories({
        ...storyDto,
        author: req?.user?._id,
      });

      console.log('create story', result);

      return res.status(201).json({
        statusCode: 201,
        message: 'Story created successfully',
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
