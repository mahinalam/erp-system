/*
  Warnings:

  - A unique constraint covering the columns `[styleId,color,size]` on the table `StyleVariant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Style` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Style` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Style` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SS', 'AW');

-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Style" ADD COLUMN     "fabricType" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "productType" TEXT,
ADD COLUMN     "season" "Season" NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StyleVariant" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "Style_buyerId_idx" ON "Style"("buyerId");

-- CreateIndex
CREATE INDEX "Style_styleNo_idx" ON "Style"("styleNo");

-- CreateIndex
CREATE INDEX "StyleVariant_styleId_idx" ON "StyleVariant"("styleId");

-- CreateIndex
CREATE INDEX "StyleVariant_sku_idx" ON "StyleVariant"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "StyleVariant_styleId_color_size_key" ON "StyleVariant"("styleId", "color", "size");
