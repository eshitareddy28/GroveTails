import { z } from "zod";

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const shelterFormSchema = z.object({
  // Shelter Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  shelterType: z.enum(["non-profit", "private", "government", "foster"], {
    required_error: "Shelter type is required",
  }),
  maxCapacity: z
    .number({
      required_error: "Max capacity is required",
      invalid_type_error: "Must be a number",
    })
    .min(1, "Capacity must be at least 1"),
  currentOccupancy: z
    .number({
      required_error: "Current occupancy is required",
      invalid_type_error: "Must be a number",
    })
    .min(0, "Cannot be negative"),
  accepts: z
    .array(z.string(), {
      required_error: "Must select at least one animal type",
    })
    .min(1, "Must accept at least one animal type"),

  // Contact Information
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .regex(phoneRegex, "Invalid phone number"),
  altPhone: z.string().regex(phoneRegex, "Invalid phone number").optional(),
  website: z.string().url("Invalid URL").optional(),

  // Description
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(20, "Description must be at least 20 characters"),
  yearFounded: z
    .number({
      required_error: "Year founded is required",
      invalid_type_error: "Must be a valid year",
    })
    .min(1800, "Too far in the past")
    .max(new Date().getFullYear(), "Cannot be in the future"),
  taxId: z.string().optional(),

  // Address Information (all required)
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(3, "Zip code must be at least 3 characters"),
    country: z.string().min(1, "Country is required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),

  // Verification
  addressProof: z.array(z.string()).optional(), // Temporarily optional until file upload implemented
  photos: z.array(z.string()).optional(),
});

export type ShelterFormValues = z.infer<typeof shelterFormSchema>;
