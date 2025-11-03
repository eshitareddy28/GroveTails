import * as z from "zod";

export const shelterFormSchema = z.object({
  // ===== Details Section =====
  name: z.string().min(2, "Shelter name must be at least 2 characters"),
  shelterType: z.string().min(1, "Shelter type is required"),
  maxCapacity: z.number().int().positive("Must be a positive number"),
  currentOccupancy: z.number().int().min(0).optional(),
  accepts: z.array(z.string()).nonempty("Select at least one animal type"),
  // ===== Contact Section =====
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number too short"),
  altPhone: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().min(20, "Description too short").max(500).optional(),

  // ===== Location Section =====
  country: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  zipCode: z.string().min(3, "Invalid postal code"),
  address: z.string().min(5, "Address too short"),

  // ===== Verification Section =====
  yearFounded: z
    .number()
    .int()
    .min(1800, "Invalid year")
    .max(new Date().getFullYear(), "Cannot be in future"),
  taxId: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "Must be in format XX-XXXXXXX")
    .optional(),
  addressProof: z
    .instanceof(File, { message: "Proof document required" })
    .optional(),

  // ===== Photos Section =====
  photos: z
    .array(z.instanceof(File))
    .min(1, "At least one photo required")
    .max(10, "Maximum 10 photos allowed"),
});

export type ShelterFormValues = z.infer<typeof shelterFormSchema>;
