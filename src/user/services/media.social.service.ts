import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediaSocial, SocialMediaDocument } from '../models';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(MediaSocial.name)
    private socialMediaModel: Model<SocialMediaDocument>,
  ) {}

  async findMediaSocial(authorId: string) {
    try {
      return await this.socialMediaModel
        .findOne({ authorId })
        .select('facebook twitter -_id');
    } catch (error) {
      return error;
    }
  }

  async createMediaSocial(authorId: string) {
    try {
      const mediaSocial = new this.socialMediaModel({ user: authorId });
      return await mediaSocial.save();
    } catch (error) {
      return error;
    }
  }
}
