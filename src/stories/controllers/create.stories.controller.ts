import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { StoriesService } from '../services/stories.service';
import * as mongoose from 'mongoose';
import { CreateStoryDto } from '../dto/createStory.dto';

@Controller('v1/stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Stories' })
  async getStories(@Body() storyDto: CreateStoryDto , @Request() req: any) {
    return this.storiesService.createStories({
      ...storyDto,
      authorId: new mongoose.Types.ObjectId(req?.user?.id)
    });
  }
}
