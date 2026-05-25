import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { generateStyleNo } from './helpers/generate-style-no';
import { PrismaService } from '../../../../prisma/prisma.service';
import { createStyleSchema, updateStyleSchema } from './schemas/style-schema';
import { Prisma } from '@prisma/client';

@Injectable()
export class StyleService {
  constructor(private prisma: PrismaService) {}

  // CREATE STYLE
  async create(payload: unknown) {
    const dto = createStyleSchema.parse(payload);

    // CHECK BUYER
    const buyer = await this.prisma.buyer.findUnique({
      where: {
        id: dto.buyerId,
      },
    });

    if (!buyer) {
      throw new NotFoundException('Buyer not found');
    }

    // COUNT EXISTING STYLES
    const styleCount = await this.prisma.style.count({
      where: {
        buyerId: dto.buyerId,
        season: dto.season,
        year: dto.year,
      },
    });

    // GENERATE STYLE NO
    const styleNo = generateStyleNo(
      buyer.code,
      dto.season,
      dto.year,
      styleCount + 1,
    );

    // PREVENT DUPLICATE STYLE
    const existingStyle = await this.prisma.style.findUnique({
      where: {
        styleNo,
      },
    });

    if (existingStyle) {
      throw new BadRequestException('Style already exists');
    }

    return this.prisma.style.create({
      data: {
        ...dto,
        styleNo,
      },

      include: {
        buyer: true,
      },
    });
  }

  // GET ALL STYLES
  async findAll(query: any) {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = query.search || '';

    const where: Prisma.StyleWhereInput = {
      isActive: true,

      OR: [
        {
          styleNo: {
            contains: search,
            mode: 'insensitive',
          },
        },

        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },

        {
          buyer: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ],
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.style.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: 'desc',
        },

        include: {
          buyer: true,
          variants: true,
          boms: true,
        },
      }),

      this.prisma.style.count({
        where,
      }),
    ]);

    return {
      data,

      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  // GET SINGLE STYLE
  async findOne(id: string) {
    const style = await this.prisma.style.findUnique({
      where: {
        id,
      },

      include: {
        buyer: true,
        variants: true,
        boms: true,
      },
    });

    if (!style) {
      throw new NotFoundException('Style not found');
    }

    return style;
  }

  // UPDATE STYLE
  async update(id: string, payload: unknown) {
    const dto = updateStyleSchema.parse(payload);

    await this.findOne(id);

    return this.prisma.style.update({
      where: {
        id,
      },

      data: dto,
    });
  }

  // SOFT DELETE
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.style.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }
}
