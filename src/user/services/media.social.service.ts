import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediaSocial } from '../models/schemas';
import { SocialMediaEntity } from '../models/entities';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(MediaSocial.name)
    private socialMediaModel: Model<MediaSocial>,
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

  async createMediaSocial(authorId: string): Promise<any> {
    try {
      const mediaSocial = new this.socialMediaModel({ user: authorId });
      return await mediaSocial.save();
    } catch (error) {
      return error;
    }
  }

  async updateLinked(socialMediaEntity: SocialMediaEntity): Promise<any> {
    try {
      return await this.socialMediaModel.findOneAndUpdate(
        socialMediaEntity.authorId,
        socialMediaEntity,
        { upsert: true },
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
