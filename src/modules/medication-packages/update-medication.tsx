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
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type MedicationFormData = {
  packageName: string;
  packageCode: string;
  category: string;
  coverage: string;
  monthlyPremium: string;
  annualLimit: string;
  description: string;
  status: "Active" | "Inactive" | "Draft";
};

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
    defaultValues: {
      packageName: "",
      packageCode: "",
      category: "Basic",
      coverage: "",
      monthlyPremium: "",
      annualLimit: "",
      description: "",
      status: "Active",
    },
  });

  // Reset form when medication data is loaded
  useEffect(() => {
    if (medication && isEdit) {
      methods.reset({
        packageName: medication.packageName,
        packageCode: medication.packageCode,
        category: medication.category,
        coverage: medication.coverage,
        monthlyPremium: medication.monthlyPremium,
        annualLimit: medication.annualLimit,
        description: medication.description,
        status: medication.status,
      });
    } else if (isCreate) {
      methods.reset({
        packageName: "",
        packageCode: `MED-${Date.now().toString().slice(-6)}`,
        category: "Basic",
        coverage: "",
        monthlyPremium: "",
        annualLimit: "",
        description: "",
        status: "Draft",
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
        ...(isEdit && { id: search.medicationId }),
        ...data,
        dateCreated: medication?.dateCreated || new Date().toISOString(),
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
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 py-4 px-6"
            >
              <FormInput
                name="packageName"
                label="Package Name"
                placeholder="Enter package name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="packageCode"
                label="Package Code"
                placeholder="MED-XXXXX"
                required
                disabled={isEdit}
                wrapperClassName="space-y-2"
              />

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={methods.control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Comprehensive">
                          Comprehensive
                        </SelectItem>
                        <SelectItem value="Specialized">Specialized</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <FormInput
                name="coverage"
                label="Coverage"
                placeholder="e.g., Essential Medications"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="monthlyPremium"
                label="Monthly Premium"
                placeholder="₵0.00"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="annualLimit"
                label="Annual Limit"
                placeholder="₵0.00"
                required
                wrapperClassName="space-y-2"
              />

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Controller
                  name="description"
                  control={methods.control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Describe the package coverage"
                      rows={3}
                      className="resize-none"
                    />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={methods.control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

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
