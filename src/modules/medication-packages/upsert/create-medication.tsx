import { FormInput } from "@/components/common/form/form-input";
import { FormTextarea } from "@/components/common/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { CreateActionButtons } from "@/components/common/misc/creat-actions";
import { logger } from "@/lib/logger";
import { useUpsertMedication } from "@/hooks/api/use-medications";
import { toast } from "react-hot-toast";
import { MedicationFormData, medicationSchema } from "@/lib/zod/medications";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseFailedResponse } from "@/types";
import { FormSelect } from "@/components/common/form/form-select";

export default function CreateMedication() {
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertMedication();

  const form = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      minAmount: 0,
      status: "ACTIVE",
    },
  });

  const onSubmit = (data: MedicationFormData) => {
    startSavingTransition(() => {
      toast.loading("Creating medication...");
      upsertMutation
        .mutateAsync({
          id: null,
          data,
        })
        .then((response) => {
          toast.dismiss();
          logger.info("Medication created successfully", response);
          toast.success("Medication created successfully");
        })
        .catch((error: BaseFailedResponse<{ message: string }>) => {
          toast.dismiss();
          logger.error("Failed to create medication:", error);
          toast.error(`Failed to create medication, ${error.error.message}`);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Package Information
          </h1>
          <CreateActionButtons
            isSaving={isSaving || upsertMutation.isPending}
            primaryProps={{ text: "Save", className: "bg-medsave-blue-500 " }}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="Name"
              description="The name of the pharmacy package"
            >
              <FormInput
                name="name"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Basic Package"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Description"
              description="A brief description of the pharmacy package"
            >
              <FormTextarea
                name="description"
                textareaClassName="h-15 w-full"
                placeholder="e.g. Covers common medications and basic treatments"
                disabled={isSaving || upsertMutation.isPending}
                className="items-start!"
                rows={3}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Minimum Amount (₵)"
              description="The minimum amount required for this pharmacy package"
            >
              <FormInput
                name="minAmount"
                inputClassName="h-15 w-full"
                type="number"
                placeholder="e.g. 100"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Status"
              description="The status of the pharmacy package"
            >
              <FormSelect
                name="status"
                placeholder="Select status"
                disabled={isSaving || upsertMutation.isPending}
                options={[
                  { label: "Active", value: "ACTIVE" },
                  { label: "Inactive", value: "INACTIVE" },
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
