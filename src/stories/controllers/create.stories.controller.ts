import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middlewares/jwtAuthGuard';
import { StoriesService } from '../services/stories.service';

@Controller('v1/stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Stories' })
  async getStories() {
    return this.storiesService.createStories();
  }
}
