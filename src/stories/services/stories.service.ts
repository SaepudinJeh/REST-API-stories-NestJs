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
    const createStory = new this.storyModel(createStoryEntity);

    return await createStory.save();
  }

  async getStories(): Promise<any[]> {
    return await this.storyModel.find({}).sort({ createdAt: 'desc' });
  }

  async getStoriesByUser(authorId: mongoose.Types.ObjectId): Promise<any[]> {
    const result = await this.storyModel
      .find({ author: authorId })
      // .populate({
      //   path: 'author',
      //   select: '_id username avatar',
      // })
      .sort({ createdAt: 'desc' })
      .exec();

    return result;
  }

  async deleteStory(_id: any): Promise<any> {
    const result = await this.storyModel.deleteOne({ _id });

    return result;
  }

  async deleteStories(author: any): Promise<any> {
    return await this.storyModel.deleteMany({ author });
  }
}
