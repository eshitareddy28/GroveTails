// app/api/pets/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { petFormSchema } from "@/lib/validations/petRegistration";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    // 1. Parse and validate request
    const body = await request.json();
    const validatedData = petFormSchema.parse(body);

    // 2. Create pet with transaction for data integrity
    const result = await prisma.$transaction(async (prisma) => {
      // Handle address/shelter relationship
      const addressOrShelter = validatedData.shelterId
        ? {
            shelter: { connect: { id: validatedData.shelterId } },
          }
        : {
            address: {
              create: {
                street: validatedData.street!,
                city: validatedData.city!,
                state: validatedData.state!,
                zipCode: validatedData.zipCode!,
                country: validatedData.country || "US", // default to US if not provided
              },
            },
          };

      // Create the pet with all related records
      const newPet = await prisma.pet.create({
        data: {
          name: validatedData.name,
          type: validatedData.type,
          breed: validatedData.breed,
          age: validatedData.age,
          gender: validatedData.gender,
          size: validatedData.size,
          intakeDate: new Date(validatedData.intakeDate),
          description: validatedData.description,
          status: "PENDING_REVIEW",
          photos: validatedData.photos || [],

          // Address or Shelter connection
          ...addressOrShelter,

          // Related records
          features: {
            create: {
              isHouseTrained: validatedData.isHouseTrained,
              goodWithDogs: validatedData.goodWithDogs,
              goodWithCats: validatedData.goodWithCats,
              goodWithChildren: validatedData.goodWithChildren,
            },
          },
          medicalInfo: {
            create: {
              isVaccinated: validatedData.isVaccinated,
              isSpayedNeutered: validatedData.isSpayedNeutered,
              hasSpecialNeeds: validatedData.hasSpecialNeeds,
              specialNeedsDescription: validatedData.specialNeedsDescription,
              medicalHistory: validatedData.medicalHistory,
            },
          },
          contactInfo: {
            create: {
              email: validatedData.email,
              phone: validatedData.phone,
              altPhone: validatedData.altPhone,
            },
          },
          tags: validatedData.tags?.length
            ? {
                create: validatedData.tags.map((tag) => ({
                  tag: {
                    connectOrCreate: {
                      where: { name: tag },
                      create: { name: tag },
                    },
                  },
                })),
              }
            : undefined,
        },
        include: {
          features: true,
          medicalInfo: true,
          contactInfo: true,
          address: true,
          shelter: {
            include: {
              address: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return newPet;
    });

    // 3. Return successful response
    return NextResponse.json(
      {
        success: true,
        petId: result.id,
        pet: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Full error details:", error);

    // Handle specific error types
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          error: "Database error",
          code: error.code,
          meta: error.meta,
        },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; // Ensure this API route is dynamic
