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

import { BomService } from './bom.service';

@Controller('boms')
export class BomController {
  constructor(private readonly bomService: BomService) {}

  // CREATE
  @Post()
  create(@Body() body: unknown) {
    return this.bomService.create(body);
  }

  // GET BY STYLE
  @Get()
  findAll(@Query() query: any) {
    return this.bomService.findAll(query);
  }

  // SINGLE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bomService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: unknown) {
    return this.bomService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bomService.remove(id);
  }
}
