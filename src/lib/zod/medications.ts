import { z } from "zod";

export const medicationSchema = z.object({
  name: z
    .string()
    .min(1, "Package name is required")
    .min(3, "Package name must be at least 3 characters"),
  minAmount: z
    .number()
    .min(1, "Minimum amount is required")
    .refine((val) => Number(val) > 0, {
      message: "Minimum amount must be greater than 0",
    })
    .transform((val) => Number(val))
    .pipe(z.number()),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
});

export type MedicationFormData = z.infer<typeof medicationSchema>;
