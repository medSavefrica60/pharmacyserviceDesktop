import { FormInput } from "@/components/common/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { Medication } from "@/types";
import { MedicationFormData, medicationSchema } from "@/lib/zod/medications";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertMedication } from "@/hooks/api/use-medications";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";
import { FormSelect } from "@/components/common/form/form-select";

type MedicationInformationProps = {
  medication: Medication | undefined;
  isLoading: boolean;
};

export default function MedicationInformation({
  medication,
  isLoading,
}: MedicationInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<
    Pick<MedicationFormData, "name" | "minAmount" | "status">
  >({
    resolver: zodResolver(
      medicationSchema.pick({
        name: true,
        minAmount: true,
        status: true,
      })
    ) as any,
    defaultValues: {
      name: medication?.name || "",
      minAmount: medication?.minAmount || 0,
      status: medication?.status || "ACTIVE",
    },
  });
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertMedication();

  const onSubmit = (
    data: Pick<MedicationFormData, "name" | "minAmount" | "status">
  ) => {
    console.log(data);
    startSavingTransition(async () => {
      toast.loading(`Updating Medication Information for ${medication?.name}`);
      upsertMutation
        .mutateAsync({
          id: medication?.id || null,
          data,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Medication Information updated successfully", {
            duration: 3000,
          });
          logger.info("Medication Information updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error(
            "An error occurred while updating the medication",
            error
          );
          toast.error("An error occurred while updating the medication", error);
        });
    });
  };

  useEffect(() => {
    if (medication) {
      form.reset({
        name: medication?.name || "",
        minAmount: medication?.minAmount || 0,
        status: medication?.status || "ACTIVE",
      });
    }
  }, [medication, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Medication Information
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
              label="Package Name"
              description="The name of the medication package"
              isLoading={isLoading}
            >
              <FormInput
                name="name"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Basic Package"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Minimum Amount (₵)"
              description="The minimum amount required for this medication package"
              isLoading={isLoading}
            >
              <FormInput
                name="minAmount"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. 100"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Status"
              description="The status of the medication package"
              isLoading={isLoading}
            >
              <FormSelect
                name="status"
                placeholder="Select status"
                disabled={!isEditing}
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
