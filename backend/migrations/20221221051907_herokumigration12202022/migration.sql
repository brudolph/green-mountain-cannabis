/*
  Warnings:

  - You are about to drop the column `threshold` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Pricing` table. All the data in the column will be lost.
  - You are about to drop the column `environment` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `hotdeal` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `potency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productcategory` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `producttype` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `strain` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the `_Pricing_product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_Pricing_product" DROP CONSTRAINT "_Pricing_product_A_fkey";

-- DropForeignKey
ALTER TABLE "_Pricing_product" DROP CONSTRAINT "_Pricing_product_B_fkey";

-- DropIndex
DROP INDEX "Vendor_contact_key";

-- DropIndex
DROP INDEX "Vendor_email_key";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderDate" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "total" SET DATA TYPE DECIMAL(18,4);

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(18,4);

-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "threshold",
DROP COLUMN "weight",
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "environment",
DROP COLUMN "hotdeal",
DROP COLUMN "potency",
DROP COLUMN "productcategory",
DROP COLUMN "producttype",
DROP COLUMN "strain",
DROP COLUMN "weight",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "concentrate" TEXT,
ADD COLUMN     "flower" TEXT,
ADD COLUMN     "hotDeal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "machine" TEXT,
ADD COLUMN     "medical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oil" TEXT,
ADD COLUMN     "preRoll" TEXT,
ADD COLUMN     "price" DECIMAL(18,2) DEFAULT 0,
ADD COLUMN     "recreational" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "topPick" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "inventory" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "canReadProducts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canSeeOwnRole" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "jobTitle" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "license" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "contact",
ADD COLUMN     "contact_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mobile" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "_Pricing_product";

-- CreateTable
CREATE TABLE "Oil" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "weight" TEXT DEFAULT 'pound',
    "potency" TEXT NOT NULL DEFAULT '',
    "cbd" BOOLEAN NOT NULL DEFAULT false,
    "oilType" TEXT,
    "solventUsed" TEXT,

    CONSTRAINT "Oil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlowerTrimFreshFrozen" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "weight" TEXT,
    "potency" TEXT NOT NULL DEFAULT '',
    "strain" TEXT,
    "trimMethod" TEXT,
    "environment" TEXT,

    CONSTRAINT "FlowerTrimFreshFrozen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Concentrate" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "weight" TEXT,
    "potency" TEXT NOT NULL DEFAULT '',
    "strain" TEXT,
    "type" TEXT,

    CONSTRAINT "Concentrate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreRoll" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "size" TEXT,
    "potency" TEXT NOT NULL DEFAULT '',
    "strain" TEXT,
    "type" TEXT,
    "tube" TEXT,

    CONSTRAINT "PreRoll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "model" TEXT NOT NULL DEFAULT '',
    "modelYear" TEXT NOT NULL DEFAULT '',
    "condition" TEXT,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Product_priceThreshold" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Oil_product_idx" ON "Oil"("product");

-- CreateIndex
CREATE INDEX "FlowerTrimFreshFrozen_product_idx" ON "FlowerTrimFreshFrozen"("product");

-- CreateIndex
CREATE INDEX "Concentrate_product_idx" ON "Concentrate"("product");

-- CreateIndex
CREATE INDEX "PreRoll_product_idx" ON "PreRoll"("product");

-- CreateIndex
CREATE INDEX "Machine_product_idx" ON "Machine"("product");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_priceThreshold_AB_unique" ON "_Product_priceThreshold"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_priceThreshold_B_index" ON "_Product_priceThreshold"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_flower_idx" ON "Product"("flower");

-- CreateIndex
CREATE INDEX "Product_oil_idx" ON "Product"("oil");

-- CreateIndex
CREATE INDEX "Product_concentrate_idx" ON "Product"("concentrate");

-- CreateIndex
CREATE INDEX "Product_preRoll_idx" ON "Product"("preRoll");

-- CreateIndex
CREATE INDEX "Product_machine_idx" ON "Product"("machine");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_name_key" ON "Vendor"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_flower_fkey" FOREIGN KEY ("flower") REFERENCES "FlowerTrimFreshFrozen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_oil_fkey" FOREIGN KEY ("oil") REFERENCES "Oil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_concentrate_fkey" FOREIGN KEY ("concentrate") REFERENCES "Concentrate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_preRoll_fkey" FOREIGN KEY ("preRoll") REFERENCES "PreRoll"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_machine_fkey" FOREIGN KEY ("machine") REFERENCES "Machine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oil" ADD CONSTRAINT "Oil_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlowerTrimFreshFrozen" ADD CONSTRAINT "FlowerTrimFreshFrozen_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Concentrate" ADD CONSTRAINT "Concentrate_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRoll" ADD CONSTRAINT "PreRoll_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_priceThreshold" ADD CONSTRAINT "_Product_priceThreshold_A_fkey" FOREIGN KEY ("A") REFERENCES "Pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_priceThreshold" ADD CONSTRAINT "_Product_priceThreshold_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
