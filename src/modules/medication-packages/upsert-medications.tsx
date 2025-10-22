import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  useGetMedication,
  useUpsertMedication,
} from "@/hooks/api/use-medications";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@/components/common/form/form-input";
import { FormSelect } from "@/components/common/form/form-select";
import { useEffect } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedicationFormData, medicationSchema } from "@/lib/zod/medications";

export const UpdateMedication = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/medications" }) as {
    sheet?: string;
    medicationId?: string;
  };

  const isEdit = search.sheet === "edit" && !!search.medicationId;
  const isCreate = search.sheet === "create";
  const isOpen = isEdit || isCreate;

  const { data: medication, isLoading } = useGetMedication(
    isEdit ? search.medicationId : undefined
  );
  const upsertMutation = useUpsertMedication();

  const methods = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema) as any,
    defaultValues: {
      name: "",
      minAmount: 0,
      status: "ACTIVE",
    },
  });

  // Reset form when medication data is loaded
  useEffect(() => {
    if (medication && isEdit) {
      methods.reset({
        name: medication.name || "",
        minAmount: medication.minAmount || 0,
        status: medication.status || "ACTIVE",
      });
    } else if (isCreate) {
      methods.reset({
        name: "",
        minAmount: 0,
        status: "ACTIVE",
      });
    }
  }, [medication, isEdit, isCreate, methods]);

  const handleClose = () => {
    navigate({
      to: "/medications",
      search: { sheet: undefined, dialog: undefined, medicationId: undefined },
    });
    methods.reset();
  };

  const onSubmit = async (data: MedicationFormData) => {
    try {
      await upsertMutation.mutateAsync({
        id: isEdit && search.medicationId ? search.medicationId : null,
        data,
      });

      toast.success(
        isEdit ? "Package updated successfully" : "Package created successfully"
      );
      handleClose();
    } catch (error) {
      toast.error(
        isEdit ? "Failed to update package" : "Failed to create package"
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="px-6">
          <SheetTitle>
            {isEdit ? "Edit Package" : "Create New Package"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update medication package information"
              : "Create a new medication package"}
          </SheetDescription>
        </SheetHeader>

        {isLoading && isEdit ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit as any)}
              className="flex flex-col gap-4 py-4 px-6"
            >
              <FormInput
                name="name"
                label="Package Name"
                placeholder="Enter package name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="minAmount"
                label="Minimum Amount (₵)"
                type="number"
                placeholder="Enter minimum amount"
                required
                wrapperClassName="space-y-2"
              />

              <FormSelect
                name="status"
                label="Status"
                placeholder="Select status"
                options={[
                  { label: "Active", value: "ACTIVE" },
                  { label: "Inactive", value: "INACTIVE" },
                  { label: "Suspended", value: "SUSPENDED" },
                ]}
                wrapperClassName="space-y-2"
              />

              <SheetFooter className="mt-4 px-0">
                <div className="flex gap-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={upsertMutation.isPending}
                    className="flex-1"
                  >
                    {upsertMutation.isPending
                      ? "Saving..."
                      : isEdit
                        ? "Update Package"
                        : "Create Package"}
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </FormProvider>
        )}
      </SheetContent>
    </Sheet>
  );
};
