/*
  Warnings:

  - You are about to drop the `OrderItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_item_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_order_id_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "item_quantities" JSONB;

-- DropTable
DROP TABLE "OrderItems";

-- CreateTable
CREATE TABLE "_OrderMenuItems" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrderMenuItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderMenuItems_B_index" ON "_OrderMenuItems"("B");

-- AddForeignKey
ALTER TABLE "_OrderMenuItems" ADD CONSTRAINT "_OrderMenuItems_A_fkey" FOREIGN KEY ("A") REFERENCES "MenuItems"("item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderMenuItems" ADD CONSTRAINT "_OrderMenuItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;
