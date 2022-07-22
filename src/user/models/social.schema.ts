import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type SocialMediaDocument = MediaSocial & mongoose.Document;

@Schema({ timestamps: true })
export class MediaSocial {
  @Prop({ required: true })
  user: string;

  @Prop({ type: String, default: '' })
  facebook: string;

  @Prop({ type: String, default: '' })
  twitter: string;
}

export const MediaSocialSchema = SchemaFactory.createForClass(MediaSocial);
