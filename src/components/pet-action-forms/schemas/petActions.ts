import { z } from "zod";

// Shared base schema
const BaseSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
  termsAgreed: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

// Adoption-specific schema
export const AdoptionFormSchema = BaseSchema.extend({
  residenceType: z.enum(["own", "rent"], {
    required_error: "Please select your residence type",
  }),
  landlordApproval: z.boolean().optional(),
  householdMembers: z.string().min(1, "Please specify household members"),
  childrenAges: z.string().optional(),
  currentPets: z.string().optional(),
  petExperience: z.string().min(10, "Please describe your experience"),
  dailyRoutine: z.string().min(10, "Please describe your routine"),
  vetReference: z.string().optional(),
  adoptionReason: z.string().min(10, "Please explain your reasons"),
});

// Foster-specific schema
export const FosterFormSchema = BaseSchema.extend({
  fosterDuration: z.enum(["2weeks", "1month", "3months", "indefinite"], {
    required_error: "Please select foster duration",
  }),
  emergencyContact: z.string().min(10, "Please provide emergency contact"),
  petExperience: z.string().min(10, "Please describe your experience"),
  homeEnvironment: z.string().min(10, "Please describe your home"),
  canTransport: z.boolean(),
  canAdministerMedication: z.boolean(),
});

// Sponsor-specific schema
export const SponsorFormSchema = BaseSchema.extend({
  sponsorshipType: z.enum(["full", "partial", "medical"], {
    required_error: "Please select sponsorship type",
  }),
  amount: z.number().min(25, "Minimum sponsorship is $25"),
  anonymity: z.boolean(),
  dedication: z.string().optional(),
  paymentFrequency: z.enum(["monthly", "quarterly", "one-time"]),
});
