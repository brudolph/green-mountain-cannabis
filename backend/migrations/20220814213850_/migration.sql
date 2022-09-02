-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,
    "role" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetIssuedAt" TIMESTAMP(3),
    "passwordResetRedeemedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "hotdeal" BOOLEAN NOT NULL DEFAULT false,
    "inventory" DECIMAL(18,2) NOT NULL DEFAULT 1.0,
    "producttype" TEXT NOT NULL DEFAULT E'Recreational',
    "productcategory" TEXT NOT NULL DEFAULT E'Flower',
    "weight" TEXT NOT NULL DEFAULT E'Pound',
    "potency" TEXT NOT NULL DEFAULT E'1.0',
    "strain" TEXT NOT NULL DEFAULT E'Indica',
    "environment" TEXT NOT NULL DEFAULT E'Indoor',
    "description" TEXT NOT NULL DEFAULT E'',
    "status" TEXT DEFAULT E'DRAFT',
    "vendor" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "image" JSONB,
    "altText" TEXT NOT NULL DEFAULT E'',
    "product" TEXT,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "contact" TEXT NOT NULL DEFAULT E'',
    "vendor_ID" TEXT NOT NULL DEFAULT E'',
    "notes" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "weight" TEXT NOT NULL DEFAULT E'Pound',
    "threshold" TEXT DEFAULT E'>',

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "quantity" DECIMAL(12,2) NOT NULL DEFAULT 0.01,
    "product" TEXT,
    "user" TEXT,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "photo" TEXT,
    "price" INTEGER,
    "weight" TEXT NOT NULL DEFAULT E'',
    "quantity" DECIMAL(18,4),
    "order" TEXT,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "total" INTEGER,
    "user" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "canManageProducts" BOOLEAN NOT NULL DEFAULT false,
    "canSeeOtherUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageRoles" BOOLEAN NOT NULL DEFAULT false,
    "canManageCart" BOOLEAN NOT NULL DEFAULT false,
    "canManageOrders" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Pricing_product" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "Product_vendor_idx" ON "Product"("vendor");

-- CreateIndex
CREATE INDEX "ProductImage_product_idx" ON "ProductImage"("product");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_contact_key" ON "Vendor"("contact");

-- CreateIndex
CREATE INDEX "CartItem_product_idx" ON "CartItem"("product");

-- CreateIndex
CREATE INDEX "CartItem_user_idx" ON "CartItem"("user");

-- CreateIndex
CREATE INDEX "OrderItem_photo_idx" ON "OrderItem"("photo");

-- CreateIndex
CREATE INDEX "OrderItem_order_idx" ON "OrderItem"("order");

-- CreateIndex
CREATE INDEX "Order_user_idx" ON "Order"("user");

-- CreateIndex
CREATE UNIQUE INDEX "_Pricing_product_AB_unique" ON "_Pricing_product"("A", "B");

-- CreateIndex
CREATE INDEX "_Pricing_product_B_index" ON "_Pricing_product"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendor_fkey" FOREIGN KEY ("vendor") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_photo_fkey" FOREIGN KEY ("photo") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_product" ADD CONSTRAINT "_Pricing_product_A_fkey" FOREIGN KEY ("A") REFERENCES "Pricing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pricing_product" ADD CONSTRAINT "_Pricing_product_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
