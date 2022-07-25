import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MediaSocial extends Document {
  @Prop({ type: String, default: null })
  facebook: string = null;

  @Prop({ type: String, default: null })
  twitter: string = null;
}

export const MediaSocialSchema = SchemaFactory.createForClass(MediaSocial);
