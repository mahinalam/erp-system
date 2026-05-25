import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { StyleService } from './style.service';

@Controller('styles')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  // CREATE STYLE
  @Post()
  async create(@Body() body: unknown) {
    return this.styleService.create(body);
  }

  // GET ALL STYLES
  @Get()
  async findAll(@Query() query: any) {
    return this.styleService.findAll(query);
  }

  // GET SINGLE STYLE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.styleService.findOne(id);
  }

  // UPDATE STYLE
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: unknown) {
    return this.styleService.update(id, body);
  }

  // SOFT DELETE STYLE
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.styleService.remove(id);
  }
}
