import { z } from "zod";

export const UserSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+233\d{9}$/,
      "Please enter a valid Ghana phone number (+233XXXXXXXXX)"
    ),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),

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

export type UserFormData = z.infer<typeof UserSchema>;
