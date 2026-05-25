import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BomModule } from './bom/bom.module';
import { BuyerModule } from './buyer/buyer.module';
import { StyleModule } from './style/style.module';
import { StyleVariantModule } from './style-variant/style-variant.module';

@Module({
  imports: [
    PrismaModule,
    BomModule,
    BuyerModule,
    StyleModule,
    StyleVariantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
