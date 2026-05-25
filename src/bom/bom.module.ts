import { Module } from '@nestjs/common';
import { BomController } from './bom.controller';

@Module({
  controllers: [BomController],
  providers: [BomController],
})
export class BomModule {}
