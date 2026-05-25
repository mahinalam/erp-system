import { BadRequestException, Injectable } from '@nestjs/common';
import { BuyerEntity } from './entities/buyer.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Buyer } from '@prisma/client';
import { createBuyerSchema, updateBuyerSchema } from './schemas/buyer.schema';
import { generateBuyerCode } from './helper/buyer.code';

@Injectable()
export class BuyerService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(payload: unknown) {
    const dto = createBuyerSchema.parse(payload);

    const lastBuyer = await this.prisma.buyer.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    const code = generateBuyerCode(lastBuyer?.code);

    const exists = await this.prisma.buyer.findFirst({
      where: {
        name: dto.name,
        country: dto.country,
      },
    });

    if (exists) {
      throw new BadRequestException('Buyer already exists');
    }

    return this.prisma.buyer.create({
      data: {
        ...dto,
        code,
      },
    });
  }

  // GET ALL (ERP STYLE)
  async findAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search || '';

    return this.prisma.$transaction(async (tx) => {
      const data = await tx.buyer.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { code: { contains: search, mode: 'insensitive' } },
            { country: { contains: search, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      const total = await tx.buyer.count();

      return {
        data,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    });
  }

  // GET ONE
  async findOne(id: string) {
    return this.prisma.buyer.findUnique({
      where: { id },
    });
  }

  // UPDATE
  async update(id: string, payload: unknown) {
    const dto = updateBuyerSchema.parse(payload);

    return this.prisma.buyer.update({
      where: { id },
      data: dto,
    });
  }

  // SOFT DELETE
  async remove(id: string) {
    return this.prisma.buyer.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
