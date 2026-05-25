import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { createBomSchema, updateBomSchema } from './schemas/bom-schema';

@Injectable()
export class BomService {
  constructor(private prisma: PrismaService) {}

  // CREATE BOM ITEM
  async create(payload: unknown) {
    const dto = createBomSchema.parse(payload);

    // 1. CHECK STYLE EXISTS
    const style = await this.prisma.style.findUnique({
      where: {
        id: dto.styleId,
      },
    });

    if (!style) {
      throw new NotFoundException('Style not found');
    }

    // 2. PREVENT DUPLICATE ITEM
    const existing = await this.prisma.bOM.findFirst({
      where: {
        styleId: dto.styleId,
        itemType: dto.itemType,
        itemName: dto.itemName,
      },
    });

    if (existing) {
      throw new BadRequestException('BOM item already exists for this style');
    }

    // 3. CREATE
    return this.prisma.bOM.create({
      data: dto,

      include: {
        style: true,
      },
    });
  }

  // GET ALL BOM BY STYLE
  async findAll(query: any) {
    const styleId = query.styleId;

    if (!styleId) {
      throw new BadRequestException('styleId is required');
    }

    return this.prisma.bOM.findMany({
      where: {
        styleId,
      },

      orderBy: {
        createdAt: 'desc',
      },

      include: {
        style: true,
      },
    });
  }

  // GET SINGLE ITEM
  async findOne(id: string) {
    const bom = await this.prisma.bOM.findUnique({
      where: { id },
      include: {
        style: true,
      },
    });

    if (!bom) {
      throw new NotFoundException('BOM not found');
    }

    return bom;
  }

  // UPDATE
  async update(id: string, payload: unknown) {
    const dto = updateBomSchema.parse(payload);

    await this.findOne(id);

    return this.prisma.bOM.update({
      where: { id },
      data: dto,
      include: { style: true },
    });
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.bOM.delete({
      where: { id },
    });
  }
}
