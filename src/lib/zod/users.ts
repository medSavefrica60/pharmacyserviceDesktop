import { z } from "zod";

export const userSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+233\d{9}$/,
      "Please enter a valid Ghana phone number (+233XXXXXXXXX)"
    ),
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  pin: z
    .string()
    .min(1, "PIN is required")
    .length(4, "PIN must be exactly 4 digits")
    .regex(/^\d{4}$/, "PIN must contain only numbers"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)"),
  ghanaCardNumber: z
    .string()
    .min(1, "Ghana Card number is required")
    .regex(
      /^GHA-\d{9}-\d$/,
      "Please enter a valid Ghana Card number (GHA-XXXXXXXXX-X)"
    ),
});

export type UserFormData = z.infer<typeof userSchema>;
