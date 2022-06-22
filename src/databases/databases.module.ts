import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://stories:stories2022@stories.teqie.mongodb.net/?retryWrites=true&w=majority')],
})
export class DatabasesModule {}
