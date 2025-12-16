import { z } from "zod";

export const WalletStatusSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"]),
  statusReason: z.string().optional(),
});

export type WalletStatusFormData = z.infer<typeof WalletStatusSchema>;

export const WalletBalanceAdjustSchema = z.object({
  type: z.enum(["CREDIT", "DEBIT"]),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount"),
  reason: z.string().min(1, "Reason is required"),
  description: z.string().min(1, "Description is required"),
});

export type WalletBalanceAdjustFormData = z.infer<
  typeof WalletBalanceAdjustSchema
>;
