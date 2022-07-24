import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserService } from 'src/user/services/user.service';
import { Story } from '../models';
import { CreateStoryEntity } from '../models/entities';

@Injectable()
export class StoriesService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @InjectModel(Story.name) private storyModel: Model<Story>,
  ) {}

  async createStories(createStoryEntity: CreateStoryEntity): Promise<any> {
    try {
      const createStory = new this.storyModel(createStoryEntity);

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

  async getStoriesByUser(authorId: mongoose.Types.ObjectId): Promise<any[]> {
    try {
      const result = await this.storyModel
        .find({ author: authorId })
        .populate({
          path: 'author',
          select: '_id username avatar',
        })
        .sort({ createdAt: 'desc' })
        .exec();

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
