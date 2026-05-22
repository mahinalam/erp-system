import { Buyer as PrismaBuyer } from '@prisma/client';

export class BuyerEntity implements PrismaBuyer {
  id: string;
  name: string;
  country: string | null;
  createdAt: Date;

  // You can also include related data that isn't in the DB table directly
  // but is returned by Prisma queries
  styles?: any[];
}
