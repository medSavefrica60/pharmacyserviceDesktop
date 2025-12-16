import { z } from "zod";

// Helper to transform empty strings to undefined for optional fields
const optionalString = <T extends z.ZodString>(schema: T) =>
  z
    .union([schema, z.literal("")])
    .transform((val) => (val === "" ? undefined : val))
    .optional();

// Base schema with all fields optional for partial updates
export const UserSchema = z.object({
  phoneNumber: optionalString(
    z
      .string()
      .regex(
        /^\+233\d{9}$/,
        "Please enter a valid Ghana phone number (+233XXXXXXXXX)"
      )
  ),
  firstName: optionalString(
    z.string().min(2, "First name must be at least 2 characters")
  ),
  lastName: optionalString(
    z.string().min(2, "Last name must be at least 2 characters")
  ),
  email: optionalString(z.string().email("Please enter a valid email address")),
  dateOfBirth: optionalString(
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)")
  ),
  ghanaCardNumber: optionalString(
    z
      .string()
      .regex(
        /^GHA-\d{9}-\d$/,
        "Please enter a valid Ghana Card number (GHA-XXXXXXXXX-X)"
      )
  ),
});

// Schema for create operations with all fields required
export const CreateUserSchema = UserSchema.extend({
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
export type CreateUserFormData = z.infer<typeof CreateUserSchema>;

export const OfficerSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  role: z.enum([
    "IT_OFFICER",
    "CLAIMS_OFFICER",
    "FINANCE_OFFICER",
    "CUSTOMER_CARE",
  ] as const),
});

export type OfficerFormData = z.infer<typeof OfficerSchema>;
