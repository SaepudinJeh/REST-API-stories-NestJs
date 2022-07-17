import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
  async createStories(@Body() storyDto: CreateStoryDto, @Request() req: any) {
    console.log(req.user);

    return this.storiesService.createStories({
      ...storyDto,
      authorId: req?.user?.id,
    });
  }
}
