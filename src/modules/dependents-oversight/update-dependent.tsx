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
  useGetDependent,
  useUpsertDependent,
} from "@/hooks/api/use-dependents";
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

type DependentFormData = {
  name: string;
  relationship: string;
  dateOfBirth: string;
  gender: string;
  primaryMember: string;
  primaryMemberId: string;
  status: "Active" | "Inactive";
  dependentId: string;
};

export const UpdateDependent = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/dependents" }) as {
    sheet?: string;
    dependentId?: string;
  };

  const isEdit = search.sheet === "edit" && !!search.dependentId;
  const isCreate = search.sheet === "create";
  const isOpen = isEdit || isCreate;

  const { data: dependent, isLoading } = useGetDependent(
    isEdit ? search.dependentId : undefined
  );
  const upsertMutation = useUpsertDependent();

  const methods = useForm<DependentFormData>({
    defaultValues: {
      name: "",
      relationship: "Child",
      dateOfBirth: "",
      gender: "Male",
      primaryMember: "",
      primaryMemberId: "",
      status: "Active",
      dependentId: "",
    },
  });

  // Reset form when dependent data is loaded
  useEffect(() => {
    if (dependent && isEdit) {
      methods.reset({
        name: dependent.name,
        relationship: dependent.relationship,
        dateOfBirth: dependent.dateOfBirth,
        gender: dependent.gender,
        primaryMember: dependent.primaryMember,
        primaryMemberId: dependent.primaryMemberId,
        status: dependent.status,
        dependentId: dependent.dependentId,
      });
    } else if (isCreate) {
      methods.reset({
        name: "",
        relationship: "Child",
        dateOfBirth: "",
        gender: "Male",
        primaryMember: "",
        primaryMemberId: "",
        status: "Active",
        dependentId: `DEP${Date.now().toString().slice(-6)}`,
      });
    }
  }, [dependent, isEdit, isCreate, methods]);

  const handleClose = () => {
    navigate({
      to: "/dependents",
      search: { sheet: undefined, dialog: undefined, dependentId: undefined },
    });
    methods.reset();
  };

  const onSubmit = async (data: DependentFormData) => {
    try {
      await upsertMutation.mutateAsync({
        ...(isEdit && { id: search.dependentId }),
        ...data,
        dateAdded: dependent?.dateAdded || new Date().toISOString(),
      });

      toast.success(
        isEdit
          ? "Dependent updated successfully"
          : "Dependent added successfully"
      );
      handleClose();
    } catch (error) {
      toast.error(
        isEdit ? "Failed to update dependent" : "Failed to add dependent"
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="px-6">
          <SheetTitle>
            {isEdit ? "Edit Dependent" : "Add New Dependent"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update dependent information and details"
              : "Add a new dependent to the system"}
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
                name="name"
                label="Full Name"
                placeholder="Enter dependent's full name"
                required
                wrapperClassName="space-y-2"
              />

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Controller
                  name="relationship"
                  control={methods.control}
                  rules={{ required: "Relationship is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <FormInput
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                required
                wrapperClassName="space-y-2"
              />

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Controller
                  name="gender"
                  control={methods.control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <FormInput
                name="primaryMember"
                label="Primary Member Name"
                placeholder="Enter primary member name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="primaryMemberId"
                label="Primary Member ID"
                placeholder="MS123456"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="dependentId"
                label="Dependent ID"
                placeholder="DEP123456"
                required
                disabled={isEdit}
                wrapperClassName="space-y-2"
              />

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
                        ? "Update Dependent"
                        : "Add Dependent"}
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
