import FormPasswordInput from "@/components/common/form/form-password";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { useState, useTransition } from "react";

import toast from "react-hot-toast";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import {
  AccountSecurityFormData,
  accountSecuritySchema,
} from "@/lib/zod/settings";
import { useChangePassword } from "@/hooks/api/use-settings";

export default function AccountSecurity() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();
  const changePasswordMutation = useChangePassword();

  const form = useForm<AccountSecurityFormData>({
    resolver: zodResolver(accountSecuritySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: AccountSecurityFormData) => {
    startSavingTransition(async () => {
      toast.loading("Changing password...");
      try {
        await changePasswordMutation.mutateAsync(data);
        toast.dismiss();
        toast.success("Password changed successfully");
        setIsEditing(false);
        form.reset();
      } catch (error) {
        toast.dismiss();
        toast.error("Failed to change password. Please try again.");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Account Security
          </h1>
          <EditActionButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSaving={isSaving}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="Current Password"
              description="Enter your current account password"
            >
              <FormPasswordInput
                className="h-15"
                name="currentPassword"
                label=""
                placeholder="*******"
                disabled={!isEditing}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="New Password"
              description="Create a strong new password for your account"
            >
              <FormPasswordInput
                className="h-15"
                name="newPassword"
                label=""
                placeholder="*******"
                disabled={!isEditing}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Confirm New Password"
              description="Re-enter your new password to confirm"
            >
              <FormPasswordInput
                className="h-15"
                name="confirmNewPassword"
                label=""
                placeholder="*******"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
