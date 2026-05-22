import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// This path MUST match the 'output' in your schema.prisma
// import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    // Connect to the database when the app starts
    await this.$connect();
  }

  async onModuleDestroy() {
    // Close the connection when the app stops
    await this.$disconnect();
  }
}
