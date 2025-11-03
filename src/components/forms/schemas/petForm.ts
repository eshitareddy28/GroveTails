import * as z from "zod";

export const petFormSchema = z.object({
  // Basic Details
  name: z.string().min(2),
  type: z.string().min(1),
  breed: z.string().min(1),
  age: z.number().min(0),
  gender: z.string().min(1),
  size: z.string().min(1),
  intakeDate: z.date(),
  description: z.string().min(20),

  //Contact
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  altPhone: z.string().optional(),

  // Location
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(3),
  address: z.string().min(5),

  // Features
  isVaccinated: z.boolean(),
  isSpayedNeutered: z.boolean(),
  isHouseTrained: z.boolean().optional(),
  goodWithChildren: z.boolean(),
  goodWithDogs: z.boolean(),
  goodWithCats: z.boolean(),
  hasSpecialNeeds: z.boolean(),
  specialNeedsDescription: z.string().optional(),

  // Medical
  medicalHistory: z.string().optional(),

  // Personality
  tags: z.array(z.string()),

  // Photos
  photos: z.array(z.instanceof(File)).min(1, "At least one photo is required"),
});

export type PetFormValues = z.infer<typeof petFormSchema>;
