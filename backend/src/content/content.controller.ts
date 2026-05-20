import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  async getAll() {
    return await this.contentService.getAll();
  }

  @Get('biography')
  async getBiography() {
    return await this.contentService.getBiography();
  }

  @Get('stories')
  async getStories() {
    return await this.contentService.getStories();
  }

  @Get('stories/:id')
  async getStoryById() {
    // controller method placeholder; actual logic handled in service
    // kept signature for clarity; service method will be called from route
    return;
  }

  @Get('timeline')
  async getTimeline() {
    return await this.contentService.getTimeline();
  }
}
