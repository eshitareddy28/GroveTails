/*
  Warnings:

  - You are about to drop the column `petId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `shelterId` on the `Address` table. All the data in the column will be lost.
  - Changed the type of `maxCapacity` on the `Shelter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `currentOccupancy` on the `Shelter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_petId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_shelterId_fkey";

-- DropIndex
DROP INDEX "public"."Pet_shelterId_status_idx";

-- DropIndex
DROP INDEX "public"."Pet_status_isApproved_idx";

-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "petId",
DROP COLUMN "shelterId";

-- AlterTable
ALTER TABLE "public"."Shelter" DROP COLUMN "maxCapacity",
ADD COLUMN     "maxCapacity" INTEGER NOT NULL,
DROP COLUMN "currentOccupancy",
ADD COLUMN     "currentOccupancy" INTEGER NOT NULL,
ALTER COLUMN "altPhone" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Pet_status_idx" ON "public"."Pet"("status");

-- CreateIndex
CREATE INDEX "Pet_shelterId_idx" ON "public"."Pet"("shelterId");

-- CreateIndex
CREATE INDEX "Pet_isApproved_idx" ON "public"."Pet"("isApproved");

-- CreateIndex
CREATE INDEX "Shelter_email_idx" ON "public"."Shelter"("email");

-- CreateIndex
CREATE INDEX "Shelter_isVerified_idx" ON "public"."Shelter"("isVerified");

-- CreateIndex
CREATE INDEX "Shelter_yearFounded_idx" ON "public"."Shelter"("yearFounded");
