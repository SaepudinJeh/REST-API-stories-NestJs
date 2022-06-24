import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabasesModule } from './databases/databases.module';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [AuthModule, DatabasesModule, StoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
