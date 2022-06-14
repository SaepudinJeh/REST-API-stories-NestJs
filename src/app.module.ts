import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [UsersModule, DatabasesModule, StoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
