import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/models/schemas';

@Schema({ timestamps: true })
export class Story extends Document {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  author: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, default: '' })
  desc: string;

  @Prop({ required: false, default: null })
  image: [];

  @Prop({ required: false, type: Date })
  createdStory: Date;
}

export const StorySchema = SchemaFactory.createForClass(Story);
