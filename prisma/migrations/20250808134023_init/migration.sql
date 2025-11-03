-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'SHELTER_OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."PetStatus" AS ENUM ('PENDING_REVIEW', 'AVAILABLE', 'ADOPTION_PENDING', 'ADOPTED', 'FOSTER_PENDING', 'FOSTERED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."PetType" AS ENUM ('DOG', 'CAT', 'RABBIT', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."SizeCategory" AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'XLARGE');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "public"."ApplicationType" AS ENUM ('ADOPTION', 'FOSTER', 'SPONSORSHIP');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'United States',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Shelter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shelterType" TEXT NOT NULL,
    "maxCapacity" TEXT NOT NULL,
    "currentOccupancy" TEXT NOT NULL,
    "accepts" TEXT[],
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "yearFounded" INTEGER NOT NULL,
    "taxId" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressProof" TEXT[],
    "addressId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."PetType" NOT NULL,
    "breed" TEXT,
    "age" INTEGER NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "size" "public"."SizeCategory" NOT NULL,
    "status" "public"."PetStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "intakeDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "photos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shelterId" INTEGER,
    "submittedById" INTEGER,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PetFeature" (
    "id" SERIAL NOT NULL,
    "isHouseTrained" BOOLEAN NOT NULL DEFAULT false,
    "goodWithDogs" BOOLEAN NOT NULL DEFAULT false,
    "goodWithCats" BOOLEAN NOT NULL DEFAULT false,
    "goodWithChildren" BOOLEAN NOT NULL DEFAULT false,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PetMedicalInfo" (
    "id" SERIAL NOT NULL,
    "isVaccinated" BOOLEAN NOT NULL DEFAULT false,
    "isSpayedNeutered" BOOLEAN NOT NULL DEFAULT false,
    "hasSpecialNeeds" BOOLEAN NOT NULL DEFAULT false,
    "specialNeedsDescription" TEXT,
    "medicalHistory" TEXT,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "PetMedicalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PetTag" (
    "petId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PetTag_pkey" PRIMARY KEY ("petId","tagId")
);

-- CreateIndex
CREATE INDEX "Address_city_state_idx" ON "public"."Address"("city", "state");

-- CreateIndex
CREATE INDEX "Address_zipCode_idx" ON "public"."Address"("zipCode");

-- CreateIndex
CREATE INDEX "Address_latitude_longitude_idx" ON "public"."Address"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_email_key" ON "public"."Shelter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_addressId_key" ON "public"."Shelter"("addressId");

-- CreateIndex
CREATE INDEX "Pet_status_isApproved_idx" ON "public"."Pet"("status", "isApproved");

-- CreateIndex
CREATE INDEX "Pet_type_size_idx" ON "public"."Pet"("type", "size");

-- CreateIndex
CREATE UNIQUE INDEX "PetFeature_petId_key" ON "public"."PetFeature"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "PetMedicalInfo_petId_key" ON "public"."PetMedicalInfo"("petId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "public"."Tag"("name");

-- AddForeignKey
ALTER TABLE "public"."Shelter" ADD CONSTRAINT "Shelter_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pet" ADD CONSTRAINT "Pet_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "public"."Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetFeature" ADD CONSTRAINT "PetFeature_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetMedicalInfo" ADD CONSTRAINT "PetMedicalInfo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetTag" ADD CONSTRAINT "PetTag_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PetTag" ADD CONSTRAINT "PetTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
