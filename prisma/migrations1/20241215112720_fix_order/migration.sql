/*
  Warnings:

  - You are about to drop the column `price` on the `OrderItems` table. All the data in the column will be lost.
  - The `order_status` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updated_at` to the `MenuItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_at_time` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CART', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "MenuItems" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "price",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price_at_time" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "order_status",
ADD COLUMN     "order_status" "OrderStatus" NOT NULL DEFAULT 'CART',
ALTER COLUMN "total_price" SET DEFAULT 0;
