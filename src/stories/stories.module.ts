import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateStoryController, GetStoriesController } from './controllers';
import { Story, StorySchema } from './models/stories.models';
import { StoriesService } from './services/stories.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
  ],
  providers: [StoriesService],
  controllers: [CreateStoryController, GetStoriesController],
})
export class StoriesModule {}
