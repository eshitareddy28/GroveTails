// app/api/shelters/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { shelterFormSchema } from "@/lib/validations/shelterRegistration";

// Type for dropdown items
type ShelterDropdownItem = {
  value: string;
  label: string;
};

// 1. Get all shelters (for dropdown) - Optimized version
export async function GET_SHELTERS_DROPDOWN() {
  try {
    const shelters = await prisma.shelter.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Transform to Select-friendly format
    const dropdownShelters: ShelterDropdownItem[] = shelters.map((shelter) => ({
      value: shelter.id.toString(),
      label: shelter.name,
    }));

    return NextResponse.json({
      success: true,
      shelters: dropdownShelters,
    });
  } catch (error) {
    console.error("Error fetching shelters:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch shelters",
        shelters: [],
      },
      { status: 500 }
    );
  }
}

// 2. Get full shelter details by ID
export async function GET_SHELTER_DETAILS(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Shelter ID is required" },
        { status: 400 }
      );
    }

    const shelter = await prisma.shelter.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        altPhone: true,
        address: {
          select: {
            street: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    if (!shelter) {
      return NextResponse.json(
        { success: false, error: "Shelter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, shelter });
  } catch (error) {
    console.error("Error fetching shelter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch shelter" },
      { status: 500 }
    );
  }
}

// 3. Create shelter - Keep your existing function

export async function CREATE_SHELTER(request: Request) {
  try {
    const body = await request.json();
    const validatedData = shelterFormSchema.parse(body);

    const result = await prisma.$transaction(async (prisma) => {
      // Access address fields from the nested address object
      const address = await prisma.address.create({
        data: {
          street: validatedData.address.street,
          city: validatedData.address.city,
          state: validatedData.address.state,
          zipCode: validatedData.address.zipCode,
          country: validatedData.address.country,
        },
      });

      const newShelter = await prisma.shelter.create({
        data: {
          name: validatedData.name,
          shelterType: validatedData.shelterType,
          maxCapacity: validatedData.maxCapacity,
          currentOccupancy: validatedData.currentOccupancy,
          accepts: validatedData.accepts,
          email: validatedData.email,
          phone: validatedData.phone,
          altPhone: validatedData.altPhone,
          description: validatedData.description,
          website: validatedData.website,
          yearFounded: validatedData.yearFounded,
          taxId: validatedData.taxId,
          addressProof: validatedData.addressProof,
          photos: validatedData.photos || [],
          address: { connect: { id: address.id } },
        },
        include: {
          address: true,
        },
      });

      return newShelter;
    });

    return NextResponse.json(
      { success: true, shelter: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating shelter:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create shelter",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Main GET handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "details" || searchParams.has("id")) {
    return GET_SHELTER_DETAILS(request);
  }
  return GET_SHELTERS_DROPDOWN();
}

// POST handler
export async function POST(request: Request) {
  return CREATE_SHELTER(request);
}

export const dynamic = "force-dynamic";
