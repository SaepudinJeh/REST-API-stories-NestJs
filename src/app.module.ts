import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabasesModule } from './databases/databases.module';
import { StoriesModule } from './stories/stories.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, DatabasesModule, StoriesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
