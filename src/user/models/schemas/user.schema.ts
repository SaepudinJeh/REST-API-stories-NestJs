import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Provider } from 'src/utils';
import { Role } from 'src/utils/role.enum.utils';
import { AvatarImage } from '../entities';
import { MediaSocial } from './social.schema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  password: string;

  @Prop({ enum: Role, default: Role.User, required: true })
  role: string;

  @Prop({ default: new AvatarImage() })
  avatar: [];

  @Prop({ default: null })
  bio: string;

  @Prop({ type: Boolean, default: false })
  email_verified: boolean;

  @Prop({ enum: Provider, default: Provider.local, required: true })
  provider: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, default: null })
  linked: MediaSocial;
}

export const UserSchema = SchemaFactory.createForClass(User);
