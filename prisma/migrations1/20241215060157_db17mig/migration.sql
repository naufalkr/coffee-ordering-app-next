/*
  Warnings:

  - You are about to drop the column `item_quantities` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `_OrderMenuItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderMenuItems" DROP CONSTRAINT "_OrderMenuItems_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderMenuItems" DROP CONSTRAINT "_OrderMenuItems_B_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "item_quantities";

-- DropTable
DROP TABLE "_OrderMenuItems";

-- CreateTable
CREATE TABLE "OrderItems" (
    "order_item_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "customizations" TEXT,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("order_item_id")
);

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "MenuItems"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
