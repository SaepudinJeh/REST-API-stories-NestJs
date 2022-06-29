import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoryDto } from '../dto/story.dto';
import { Story, StoryDocument } from '../models';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  async createStories(storyDto: StoryDto): Promise<any> {
    const createStory = new this.storyModel(storyDto);

    return await createStory.save();
  }

  async getStories(): Promise<any[]> {
    return await this.storyModel.find({}).sort({ createdAt: 'desc' });
  }

  async getStoriesByUsername(query: string): Promise<any[]> {
    console.log('service', query);

    return await this.storyModel
      .find({ username: query })
      .sort({ createdAt: 'desc' })
      .exec();
  }
}
