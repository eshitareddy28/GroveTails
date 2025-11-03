/*
  Warnings:

  - You are about to drop the column `altPhone` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Pet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Pet_breed_idx";

-- DropIndex
DROP INDEX "public"."Pet_shelterId_idx";

-- AlterTable
ALTER TABLE "public"."Pet" DROP COLUMN "altPhone",
DROP COLUMN "description",
DROP COLUMN "email",
DROP COLUMN "phone";

-- CreateTable
CREATE TABLE "public"."ContactInfo" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" INTEGER,
    "shelterId" INTEGER,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_petId_key" ON "public"."ContactInfo"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_shelterId_key" ON "public"."ContactInfo"("shelterId");

-- CreateIndex
CREATE INDEX "Pet_shelterId_status_idx" ON "public"."Pet"("shelterId", "status");

-- AddForeignKey
ALTER TABLE "public"."ContactInfo" ADD CONSTRAINT "ContactInfo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ContactInfo" ADD CONSTRAINT "ContactInfo_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "public"."Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
