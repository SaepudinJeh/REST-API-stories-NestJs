import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type StoryDocument = Story & mongoose.Document;

@Schema({ timestamps: true })
export class Story {
  @Prop({ required: true })
  authorId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: '' })
  desc: string;

  @Prop({ required: false, default: [] })
  image: [];

  @Prop({ required: false })
  createdStory: Date;
}

export const StorySchema = SchemaFactory.createForClass(Story);
