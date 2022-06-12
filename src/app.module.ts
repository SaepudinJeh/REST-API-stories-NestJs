import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [UsersModule, AuthModule, DatabasesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
