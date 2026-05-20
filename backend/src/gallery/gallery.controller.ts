import { Controller, Get, Param } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async getAll() {
    return await this.galleryService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.galleryService.findById(id);
  }
}
