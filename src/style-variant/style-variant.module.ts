import { Module } from '@nestjs/common';

import { StyleVariantController } from './style-variant.controller';

import { StyleVariantService } from './style-variant.service';

@Module({
  controllers: [StyleVariantController],

  providers: [StyleVariantService],
})
export class StyleVariantModule {}
