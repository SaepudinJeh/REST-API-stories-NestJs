import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { User } from "src/auth/schemas/user.schema";

export type StoryDocument = Story & mongoose.Document;

@Schema({ timestamps: true })
export class Story {
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    authorId: User;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true, default: '' })
    desc: string;

    @Prop({ required: false, default: [] })
    image: [];

    @Prop({ required: false })
    createdStory: Date
}

export const StorySchema = SchemaFactory.createForClass(Story);