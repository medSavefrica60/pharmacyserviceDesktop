import { FormSelect } from "@/components/common/form/form-select";
import { FormTextarea } from "@/components/common/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useUpdateWalletStatus } from "@/hooks/api/use-wallets";
import { Wallet } from "@/types";
import { logger } from "@/lib/logger";
import { WalletStatusFormData, WalletStatusSchema } from "@/lib/zod/wallets";

type WalletStatusProps = {
  wallet: Wallet | undefined;
  isLoading: boolean;
};

export default function WalletStatus({ wallet, isLoading }: WalletStatusProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();
  const updateMutation = useUpdateWalletStatus();
  const form = useForm<WalletStatusFormData>({
    resolver: zodResolver(WalletStatusSchema),
    defaultValues: {
      status: "ACTIVE",
      statusReason: "",
    },
  });

  const onSubmit = (data: WalletStatusFormData) => {
    if (!wallet?.id) return;

    startSavingTransition(async () => {
      toast.loading("Updating wallet status...");
      updateMutation
        .mutateAsync({
          id: wallet.id,
          data: {
            status: data.status,
            statusReason: data.statusReason,
          } as any,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Wallet status updated successfully", {
            duration: 3000,
          });
          logger.info("Wallet status updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("An error occurred while updating wallet status", error);
          toast.error("An error occurred while updating wallet status");
        });
    });
  };

  useEffect(() => {
    if (wallet) {
      form.reset({
        status: wallet.status || "ACTIVE",
        statusReason: (wallet as any)?.statusReason || "",
      });
    }
  }, [wallet, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Wallet Status
          </h1>
          <EditActionButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSaving={isSaving || updateMutation.isPending}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="Status"
              description="The current status of the wallet"
              isLoading={isLoading}
            >
              <FormSelect
                name="status"
                placeholder="Select status"
                disabled={!isEditing}
                options={[
                  { label: "Active", value: "ACTIVE" },
                  { label: "Suspended", value: "SUSPENDED" },
                ]}
                selectClassName="h-15 w-full"
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Reason"
              description="Provide a reason for the status change (optional)"
              isLoading={isLoading}
            >
              <FormTextarea
                name="statusReason"
                textareaClassName="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                placeholder="Enter reason for status change..."
                disabled={!isEditing}
                rows={3}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
