import { FormInput } from "@/components/common/form/form-input";
import { FormSelect } from "@/components/common/form/form-select";
import { FormTextarea } from "@/components/common/form/form-textarea";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { CreateActionButtons } from "@/components/common/misc/creat-actions";
import { Form } from "@/components/ui/form";
import { useAdjustWalletBalance } from "@/hooks/api/use-wallets";
import {
  WalletBalanceAdjustFormData,
  WalletBalanceAdjustSchema,
} from "@/lib/zod/wallets";
import { BaseFailedResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Wallet } from "@/types";

type WalletBalanceAdjustProps = {
  wallet: Wallet | undefined;
  isLoading: boolean;
};

export default function WalletBalanceAdjust({
  wallet,
  isLoading,
}: WalletBalanceAdjustProps) {
  const [isSaving, startSavingTransition] = useTransition();
  const adjustMutation = useAdjustWalletBalance();

  const form = useForm<WalletBalanceAdjustFormData>({
    resolver: zodResolver(WalletBalanceAdjustSchema),
    defaultValues: {
      type: "CREDIT",
      amount: "",
      reason: "",
      description: "",
    },
  });

  // Form doesn't need to be prefilled - user enters adjustment amount
  // We just ensure form is ready when wallet data is available

  const onSubmit = (data: WalletBalanceAdjustFormData) => {
    if (!wallet?.id) return;

    startSavingTransition(() => {
      toast.loading("Adjusting wallet balance...");
      adjustMutation
        .mutateAsync({
          id: wallet.id,
          data,
        })
        .then(() => {
          toast.dismiss();
          toast.success("Wallet balance adjusted successfully");
          form.reset({
            type: "CREDIT",
            amount: "",
            reason: "",
            description: "",
          });
        })
        .catch((error: BaseFailedResponse<{ message: string }>) => {
          toast.dismiss();
          toast.error(
            `Failed to adjust wallet balance, ${error.error.message}`
          );
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Adjust Balance
          </h1>
          <CreateActionButtons
            isSaving={isSaving || adjustMutation.isPending}
            primaryProps={{ text: "Adjust", className: "bg-medsave-blue-500" }}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="Transaction Type"
              description="Select whether to credit or debit the wallet"
              isLoading={isLoading}
            >
              <FormSelect
                name="type"
                placeholder="Select type"
                options={[
                  { label: "Credit (Add Money)", value: "CREDIT" },
                  { label: "Debit (Remove Money)", value: "DEBIT" },
                ]}
                selectClassName="h-15 w-full"
                disabled={isSaving || adjustMutation.isPending}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Amount"
              description="The amount to adjust (e.g., 150.00)"
              isLoading={isLoading}
            >
              <FormInput
                name="amount"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. 150.00"
                disabled={isSaving || adjustMutation.isPending}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Reason"
              description="Reason for the balance adjustment"
              isLoading={isLoading}
            >
              <FormInput
                name="reason"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. manual top up"
                disabled={isSaving || adjustMutation.isPending}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Description"
              description="Additional details about this adjustment"
              isLoading={isLoading}
            >
              <FormTextarea
                name="description"
                textareaClassName="h-15 w-full"
                placeholder="e.g. test credit"
                disabled={isSaving || adjustMutation.isPending}
                rows={3}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
