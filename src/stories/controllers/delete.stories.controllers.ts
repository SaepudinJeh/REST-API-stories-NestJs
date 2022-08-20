import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils';
import { DeleteStoryDto } from '../dto';
import { StoriesService } from '../services';

@ApiTags('Stories')
@Controller('v1')
export class DeleteStoryController {
  constructor(private storiesService: StoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Stories' })
  async delete(@Body() deleteStoryDto: DeleteStoryDto, @Res() res: any) {
    try {
      await this.storiesService.deleteStory(deleteStoryDto);

      res.status(200).json({
        statusCode: 200,
        message: 'Delete Story Succesfully',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        message: 'Cant Delete Successfully',
        error: error,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete/stories')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete All Story ' })
  async deleteMany(@Req() req: any, @Res() res: any) {
    try {
      await this.storiesService.deleteStories(req.user._id);
      res.status(200).json({
        statusCode: 200,
        message: 'Delete Story Succesfully',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        statusCode: 400,
        message: 'Cant Delete Successfully',
        error: error,
      });
    }
  }
}
