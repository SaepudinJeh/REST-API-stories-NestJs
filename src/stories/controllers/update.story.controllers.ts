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
import { UpdateStoryDto } from '../dto';

@ApiTags('Stories')
@Controller('v1')
export class UpdateStoryController {
  constructor(private storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('story/update')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'UPDATE Stories' })
  async createStories(
    @Body() storyDto: UpdateStoryDto,
    @Request() req: any,
    @Res() res: any,
  ) {
    try {
      const result = await this.storiesService.updateStory(storyDto);

      console.log('create story', result);

      return res.status(201).json({
        statusCode: 201,
        message: 'Story created successfully',
      });
    } catch (err) {
      console.log(err.message);
      return res.status(200).json({
        statusCode: 400,
        message: err.message || 'Cant updated story',
      });
    }
  }
}
