import { z } from "zod";

// Reusable schemas
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const petFormSchema = z
  .object({
    // Basic Details
    name: z.string().min(2, "Name must be at least 2 characters"),
    type: z.enum(["DOG", "CAT", "RABBIT", "OTHER"]),
    breed: z.string().min(2, "Breed must be at least 2 characters"),
    age: z.number().min(0).max(30, "Age must be between 0-30"),
    gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE", "XLARGE"]),
    intakeDate: z
      .string()
      .datetime()
      .transform((str) => new Date(str)),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),

    // Shelter Affiliation (optional)
    shelterId: z.number().optional(),

    // Contact Info
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(phoneRegex, "Invalid phone number"),
    altPhone: z.string().regex(phoneRegex, "Invalid phone number").optional(),

    // Features
    isHouseTrained: z.boolean(),
    goodWithDogs: z.boolean(),
    goodWithCats: z.boolean(),
    goodWithChildren: z.boolean(),

    // Medical
    isVaccinated: z.boolean(),
    isSpayedNeutered: z.boolean(),
    hasSpecialNeeds: z.boolean(),
    specialNeedsDescription: z.string().optional(),
    medicalHistory: z.string().optional(),

    // Location (required if no shelter selected)
    street: z.string().min(1, "Street address is required").optional(),
    city: z.string().min(1, "City is required").optional(),
    state: z.string().min(1, "State is required").optional(),
    zipCode: z
      .string()
      .min(3, "Zip code must be at least 3 characters")
      .optional(),
    country: z.string().min(1, "Country is required").default("United States"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),

    // Tags (optional)
    tags: z.array(z.string()).optional(),
    photos: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    // Custom validation - require address fields if no shelter selected
    if (!data.shelterId) {
      if (!data.street) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Street address is required when not affiliated with a shelter",
          path: ["street"],
        });
      }
      if (!data.city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is required when not affiliated with a shelter",
          path: ["city"],
        });
      }
      if (!data.state) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State is required when not affiliated with a shelter",
          path: ["state"],
        });
      }
      if (!data.zipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Zip code is required when not affiliated with a shelter",
          path: ["zipCode"],
        });
      }
    }

    // Validate either shelter or address must be provided
    if (!data.shelterId && !data.street) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either select a shelter or provide address details",
        path: ["shelterId"],
      });
    }
  });

// Type export for form values
export type PetFormValues = z.infer<typeof petFormSchema>;
