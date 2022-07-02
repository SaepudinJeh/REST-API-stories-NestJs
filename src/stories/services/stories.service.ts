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
    const createStory = new this.storyModel(storyDto);

    return await createStory.save();
  }

  async getStories(): Promise<any[]> {
    return await this.storyModel.find({}).sort({ createdAt: 'desc' });
  }

  async getStoriesByUser(_id: string): Promise<any[]> {
    return await this.storyModel
      .find({ authorId: _id })
      .sort({ createdAt: 'desc' })
      .exec();
  }
}
