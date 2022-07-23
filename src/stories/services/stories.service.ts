import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/services/user.service';
import { StoryDto } from '../dto/story.dto';
import { Story, StoryDocument } from '../models';

@Injectable()
export class StoriesService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  async createStories(storyDto: StoryDto): Promise<any> {
    try {
      const createStory = new this.storyModel(storyDto);

      return await createStory.save();
    } catch (error) {
      return error;
    }
  }

  async getStories(): Promise<any[]> {
    try {
      return await this.storyModel.find({}).sort({ createdAt: 'desc' });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getStoriesByUser(_id: string): Promise<any[]> {
    try {
      return await this.storyModel
        .find({ authorId: _id })
        .sort({ createdAt: 'desc' })
        .exec();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
