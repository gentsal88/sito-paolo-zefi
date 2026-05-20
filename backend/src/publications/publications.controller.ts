import { Controller, Get, Param } from '@nestjs/common';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get()
  async getAll() {
    return await this.publicationsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.publicationsService.findById(id);
  }
}
