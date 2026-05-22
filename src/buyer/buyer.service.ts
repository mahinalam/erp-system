import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { BuyerEntity } from './entities/buyer.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BuyerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<BuyerEntity[]> {
    return this.prisma.buyer.findMany({
      include: { styles: true }, // This aligns with the 'styles' field in our entity
    });
  }

  async create(data: { name: string; country?: string }): Promise<BuyerEntity> {
    return this.prisma.buyer.create({
      data,
    });
  }
}
