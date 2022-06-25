import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { StoriesService } from '../services/stories.service';

@Controller('v1/stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Stories' })
  async getStories(@Request() req: any) {
    console.log(req.user)
    return this.storiesService.createStories();
  }
}
