/*
  Warnings:

  - A unique constraint covering the columns `[addressId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Address" ADD COLUMN     "petId" INTEGER,
ADD COLUMN     "shelterId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Pet" ADD COLUMN     "addressId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Pet_addressId_key" ON "public"."Pet"("addressId");

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "public"."Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
