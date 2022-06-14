import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { StoriesController } from './controllers/create.stories.controller';
import { StoriesService } from './services/stories.service';

@Module({
  imports: [UsersModule],
  providers: [StoriesService],
  controllers: [StoriesController],
})
export class StoriesModule {}
