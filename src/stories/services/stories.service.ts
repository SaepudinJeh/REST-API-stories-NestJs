import { Injectable } from '@nestjs/common';

@Injectable()
export class StoriesService {
  async createStories(): Promise<any> {
    return 'Test';
  }
}
