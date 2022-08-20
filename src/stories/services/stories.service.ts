import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Story } from '../models';
import { CreateStoryEntity, UpdateStoryEntity } from '../models/entities';

@Injectable()
export class StoriesService {
  constructor(@InjectModel(Story.name) private storyModel: Model<Story>) {}

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
      .populate({
        path: 'author',
        select: '_id username avatar',
      })
      .sort({ createdAt: 'desc' })
      .exec();

    return result;
  }

  async deleteStory(_id: any): Promise<any> {
    const result = await this.storyModel.findByIdAndRemove(_id);

    return result;
  }

  async deleteStories(author: any): Promise<any> {
    return await this.storyModel.deleteMany({ author });
  }

  async updateStory(updateStoryEntity: UpdateStoryEntity): Promise<any> {
    const { title, image, desc, createdStory } = updateStoryEntity;

    return await this.storyModel.findByIdAndUpdate(updateStoryEntity._id, {
      title,
      image,
      desc,
      createdStory,
    });
  }
}
