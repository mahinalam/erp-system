import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

import {
  createVariantSchema,
  updateVariantSchema,
} from './schemas/style-variant.schema';

import { generateSku } from './helpers/generate-sku';

@Injectable()
export class StyleVariantService {
  constructor(private prisma: PrismaService) {}

  // CREATE VARIANT
  async create(payload: unknown) {
    const dto = createVariantSchema.parse(payload);

    // CHECK STYLE EXISTS
    const style = await this.prisma.style.findUnique({
      where: {
        id: dto.styleId,
      },
    });

    if (!style) {
      throw new NotFoundException('Style not found');
    }

    // PREVENT DUPLICATE
    const existing = await this.prisma.styleVariant.findFirst({
      where: {
        styleId: dto.styleId,
        color: dto.color,
        size: dto.size,
      },
    });

    if (existing) {
      throw new BadRequestException('Variant already exists');
    }

    // GENERATE SKU
    const sku = generateSku(style.styleNo, dto.color, dto.size);

    return this.prisma.styleVariant.create({
      data: {
        ...dto,
        sku,
      },

      include: {
        style: true,
      },
    });
  }

  // GET ALL VARIANTS
  async findAll(query: any) {
    const styleId = query.styleId || '';

    const search = query.search || '';

    const where: Prisma.StyleVariantWhereInput = {
      isActive: true,

      ...(styleId && {
        styleId,
      }),

      OR: [
        {
          color: {
            contains: search,
            mode: 'insensitive',
          },
        },

        {
          size: {
            contains: search,
            mode: 'insensitive',
          },
        },

        {
          sku: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };

    return this.prisma.styleVariant.findMany({
      where,

      orderBy: {
        createdAt: 'desc',
      },

      include: {
        style: true,
      },
    });
  }

  // GET SINGLE VARIANT
  async findOne(id: string) {
    const variant = await this.prisma.styleVariant.findUnique({
      where: { id },

      include: {
        style: true,
      },
    });

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    return variant;
  }

  // UPDATE VARIANT
  async update(id: string, payload: unknown) {
    const dto = updateVariantSchema.parse(payload);

    await this.findOne(id);

    return this.prisma.styleVariant.update({
      where: {
        id,
      },

      data: dto,

      include: {
        style: true,
      },
    });
  }

  // SOFT DELETE
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.styleVariant.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }
}
