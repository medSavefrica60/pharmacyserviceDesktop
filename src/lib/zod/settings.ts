import { z } from "zod";

/**
 * Personal Information Schema
 * Used for updating user profile information
 */
export const personalInformationSchema = z.object({
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .min(2, "Organization name must be at least 2 characters long")
    .max(100, "Organization name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Organization name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email address is required")
    .toLowerCase()
    .optional(),
  // .nullable(),
  contactPhone: z
    .string({ message: "Contact phone number is required" })
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      const t = val.replace(/\s/g, "").trim();
      return t;
    })
    .pipe(
      z
        .string()
        .min(1, "Contact phone number is required")
        .refine((val) => {
          const ghanaPhonePrefixes = [
            "20",
            "21",
            "24",
            "25",
            "26",
            "27",
            "28",
            "50",
            "54",
            "55",
            "56",
            "57",
            "59",
            "53",
          ];
          const prefix = val.substring(4, 6); // +233592330177 => 59
          return ghanaPhonePrefixes.includes(prefix);
        }, "Please enter a valid Ghana phone number")
        .optional()
    ),
});

/**
 * Account Security Schema
 * Used for changing user password
 */
export const accountSecuritySchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Password must be at least 8 characters long"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmNewPassword: z
      .string()
      .min(1, "Please confirm your new password")
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

// Type exports for TypeScript
export type PersonalInformationFormData = z.infer<
  typeof personalInformationSchema
>;
export type AccountSecurityFormData = z.infer<typeof accountSecuritySchema>;
