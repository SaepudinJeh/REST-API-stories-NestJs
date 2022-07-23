import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type SocialMediaDocument = MediaSocial & mongoose.Document;

@Schema({ timestamps: true })
export class MediaSocial {
  @Prop({ required: true })
  user: string;

  @Prop({ type: String, default: null })
  facebook: string = null;

  @Prop({ type: String, default: null })
  twitter: string = null;
}

export const MediaSocialSchema = SchemaFactory.createForClass(MediaSocial);
