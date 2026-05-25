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

import { StyleVariantService } from './style-variant.service';

@Controller('style-variants')
export class StyleVariantController {
  constructor(private readonly variantService: StyleVariantService) {}

  // CREATE
  @Post()
  create(@Body() body: unknown) {
    return this.variantService.create(body);
  }

  // GET ALL
  @Get()
  findAll(@Query() query: any) {
    return this.variantService.findAll(query);
  }

  // GET SINGLE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown) {
    return this.variantService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantService.remove(id);
  }
}
