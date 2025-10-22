import { z } from "zod";

export const providerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .min(2, "Organization name must be at least 2 characters"),
  licenseNumber: z
    .string()
    .min(1, "License number is required")
    .min(5, "License number must be at least 5 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Please enter a complete address"),
  contactPhone: z
    .string()
    .min(1, "Contact phone is required")
    .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number"),
  status: z.enum(["ACTIVE", "PENDING_VERIFICATION", "SUSPENDED"]),
});

export type ProviderFormData = z.infer<typeof providerSchema>;
