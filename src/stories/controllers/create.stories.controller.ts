import {
  Body,
  Controller,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { StoriesService } from '../services/stories.service';
import * as mongoose from 'mongoose';
import { CreateStoryDto } from '../dto/createStory.dto';
import { response } from 'express';

@Controller('v1')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post/stories')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Stories' })
  async createStories(@Body() storyDto: CreateStoryDto, @Request() req: any) {
    return this.storiesService.createStories({
      ...storyDto,
      authorId: new mongoose.Types.ObjectId(req?.user?.id),
    });
  }

  @Post('/stories')
  @ApiOperation({ summary: 'Get All stories By Username' })
  async getStoriesByUsername(
    @Query('user') query: string,
    @Response() res: any,
  ) {
    try {
      console.log(query);

      const data = await this.storiesService.getStoriesByUsername(query);

      console.log({ data });

      return res.status(200).json({
        statusCode: 200,
        message: 'Successfully',
        data,
      });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        statusCode: 400,
        message: 'Cant result story :(',
      });
    }
  }

  @Post('get/stories')
  @ApiOperation({ summary: 'Get All Stories' })
  async getStories(@Response() res: any) {
    const result = await this.storiesService.getStories();

    return res.status(200).json({
      statusCode: 200,
      message: 'Successfully',
      data: result,
    });
  }
}
