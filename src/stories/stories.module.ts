import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { CreateStoryController, GetStoriesController } from './controllers';
import { Story, StorySchema } from './models/schemas/stories.models';
import { StoriesService } from './services/stories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
    UserModule,
  ],
  providers: [StoriesService],
  controllers: [CreateStoryController, GetStoriesController],
})
export class StoriesModule {}
