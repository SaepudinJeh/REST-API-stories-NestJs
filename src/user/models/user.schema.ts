import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Provider } from 'src/utils';
import { Role } from 'src/utils/role.enum.utils';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  password: string;

  @Prop({ enum: Role, default: Role.User, required: true })
  role: string;

  @Prop({ default: null })
  avatar: [];

  @Prop({ default: null })
  bio: string;

  @Prop({ type: Boolean, default: false })
  email_verified: boolean;

  @Prop({ enum: Provider, default: Provider.local, required: true })
  provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
