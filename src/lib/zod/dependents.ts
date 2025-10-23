import { z } from "zod";

export const dependentSchema = z.object({
  userId: z.string().min(1, "User selection is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)"),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender must be male, female, or other",
  }),
  relationship: z.enum(["spouse", "child", "parent", "sibling", "other"], {
    message: "Relationship must be spouse, child, parent, sibling, or other",
  }),
  ghanaCardNumber: z
    .string()
    .min(1, "Ghana Card number is required")
    .regex(
      /^GHA-\d{9}-\d$/,
      "Please enter a valid Ghana Card number (GHA-XXXXXXXXX-X)"
    ),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+233\d{9}$/,
      "Please enter a valid Ghana phone number (+233XXXXXXXXX)"
    ),
});

export type DependentFormData = z.infer<typeof dependentSchema>;
