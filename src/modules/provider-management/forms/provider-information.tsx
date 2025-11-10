import { FormInput } from "@/components/common/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { Provider } from "@/types";
import { ProviderFormData, providerSchema } from "@/lib/zod/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertProvider } from "@/hooks/api/use-providers";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";
import { FormTextarea } from "@/components/common/form/form-textarea";
import { FormSelect } from "@/components/common/form/form-select";

type ProviderInformationProps = {
  provider: Provider | undefined;
  isLoading: boolean;
};

export default function ProviderInformation({
  provider,
  isLoading,
}: ProviderInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<
    Pick<
      ProviderFormData,
      | "organizationName"
      | "licenseNumber"
      | "email"
      | "contactPhone"
      | "address"
      | "status"
    >
  >({
    resolver: zodResolver(
      providerSchema.pick({
        organizationName: true,
        licenseNumber: true,
        email: true,
        contactPhone: true,
        address: true,
        status: true,
      })
    ),
    defaultValues: {
      organizationName: provider?.organizationName || "",
      licenseNumber: provider?.licenseNumber || "",
      email: provider?.email || "",
      contactPhone: provider?.contactPhone || "",
      address: provider?.address || "",
      status: provider?.status || "PENDING_VERIFICATION",
    },
  });
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertProvider();

  const onSubmit = (
    data: Pick<
      ProviderFormData,
      | "organizationName"
      | "licenseNumber"
      | "email"
      | "contactPhone"
      | "address"
      | "status"
    >
  ) => {
    console.log(data);
    startSavingTransition(async () => {
      toast.loading(
        `Updating Provider Information for ${provider?.organizationName}`
      );
      upsertMutation
        .mutateAsync({
          id: provider?.id || null,
          data,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Provider Information updated successfully", {
            duration: 3000,
          });
          logger.info("Provider Information updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("An error occurred while updating the provider", error);
          toast.error("An error occurred while updating the provider", error);
        });
    });
  };

  useEffect(() => {
    if (provider) {
      form.reset({
        organizationName: provider?.organizationName || "",
        licenseNumber: provider?.licenseNumber || "",
        email: provider?.email || "",
        contactPhone: provider?.contactPhone || "",
        address: provider?.address || "",
        status: provider?.status || "PENDING_VERIFICATION",
      });
    }
  }, [provider, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Provider Information
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
              label="Organization Name"
              description="The name of the healthcare provider organization"
              isLoading={isLoading}
            >
              <FormInput
                name="organizationName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Test Medical Center"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="License Number"
              description="The license number of the provider"
              isLoading={isLoading}
            >
              <FormInput
                name="licenseNumber"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. LCN-2025-001235"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Email Address"
              description="The email address for the provider's account"
              isLoading={isLoading}
            >
              <FormInput
                name="email"
                inputClassName="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                type="email"
                placeholder="e.g. provider@example.com"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Contact Phone *"
              description="The contact phone number of the provider"
              isLoading={isLoading}
            >
              <FormInput
                name="contactPhone"
                inputClassName="h-15 w-full"
                type="tel"
                placeholder="e.g. +233592330177"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Address"
              description="The complete address of the provider"
              isLoading={isLoading}
            >
              <FormTextarea
                name="address"
                textareaClassName="h-15 w-full"
                placeholder="e.g. 123 Test Street, Test City, Test Region, Ghana"
                disabled={!isEditing}
                rows={3}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Status"
              description="The status of the provider"
              isLoading={isLoading}
            >
              <FormSelect
                name="status"
                placeholder="Select status"
                disabled={!isEditing}
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

