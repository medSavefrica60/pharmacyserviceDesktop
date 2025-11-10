import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/providers/create")({
  component: CreateProviderPage,
  validateSearch: () => ({}),
});



import { FormInput } from "@/components/common/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { CreateActionButtons } from "@/components/common/misc/creat-actions";
import { logger } from "@/lib/logger";
import { useUpsertProvider } from "@/hooks/api/use-providers";
import { toast } from "react-hot-toast";
import { ProviderFormData, providerSchema } from "@/lib/zod/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseFailedResponse } from "@/types";
import { FormTextarea } from "@/components/common/form/form-textarea";
import { FormSelect } from "@/components/common/form/form-select";

export default function CreateProviderPage() {
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertProvider();

  const form = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      email: "",
      organizationName: "",
      licenseNumber: "",
      address: "",
      contactPhone: "",
      status: "PENDING_VERIFICATION",
    },
  });

  const onSubmit = (data: ProviderFormData) => {
    startSavingTransition(() => {
      toast.loading("Creating provider...");
      upsertMutation
        .mutateAsync({
          id: null,
          data,
        })
        .then((response) => {
          toast.dismiss();
          logger.info("Provider created successfully", response);
          toast.success("Provider created successfully");
        })
        .catch((error: BaseFailedResponse<{ message: string }>) => {
          toast.dismiss();
          logger.error("Failed to create provider:", error);
          toast.error(`Failed to create provider, ${error.error.message}`);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Provider Information
          </h1>
          <CreateActionButtons
            isSaving={isSaving || upsertMutation.isPending}
            primaryProps={{ text: "Save", className: "bg-medsave-blue-500 " }}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="Organization Name"
              description="The name of the healthcare provider organization"
            >
              <FormInput
                name="organizationName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Test Medical Center"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="License Number"
              description="The license number of the provider"
            >
              <FormInput
                name="licenseNumber"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. LCN-2025-001235"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Email Address"
              description="The email address for the provider's account"
            >
              <FormInput
                name="email"
                inputClassName="h-15 w-full"
                type="email"
                placeholder="e.g. provider@example.com"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Contact Phone *"
              description="The contact phone number of the provider"
            >
              <FormInput
                name="contactPhone"
                inputClassName="h-15 w-full"
                type="tel"
                placeholder="e.g. +233592330177"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Address"
              description="The complete address of the provider"
            >
              <FormTextarea
                name="address"
                textareaClassName="h-15 w-full"
                placeholder="e.g. 123 Test Street, Test City, Test Region, Ghana"
                disabled={isSaving || upsertMutation.isPending}
                rows={3}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Status"
              description="The status of the provider"
            >
              <FormSelect
                name="status"
                placeholder="Select status"
                disabled={isSaving || upsertMutation.isPending}
                options={[
                  { label: "Active", value: "ACTIVE" },
                  {
                    label: "Pending Verification",
                    value: "PENDING_VERIFICATION",
                  },
                  { label: "Suspended", value: "SUSPENDED" },
                ]}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}

