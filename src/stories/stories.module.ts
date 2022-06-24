import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { StoriesController } from './controllers/create.stories.controller';
import { StoriesService } from './services/stories.service';

@Module({
  imports: [AuthModule],
  providers: [StoriesService],
  controllers: [StoriesController],
})
export class StoriesModule {}
