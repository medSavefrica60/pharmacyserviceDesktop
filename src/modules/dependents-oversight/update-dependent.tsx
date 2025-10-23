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
  useUpdateDependent,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { dependentSchema, type DependentFormData } from "@/lib/zod/dependents";
import {
  StatementsSearch,
  type SearchOption,
} from "@/modules/statements-management/statements-search";
import { useGetUsers } from "@/hooks/api/use-users";

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
  const updateMutation = useUpdateDependent();
  const { data: users } = useGetUsers();

  const methods = useForm<DependentFormData>({
    resolver: zodResolver(dependentSchema),
    defaultValues: {
      userId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "male",
      relationship: "child",
      ghanaCardNumber: "",
      phoneNumber: "",
    },
  });

  // Reset form when dependent data is loaded
  useEffect(() => {
    if (dependent && isEdit) {
      methods.reset({
        userId: (dependent as any).userId || "",
        firstName:
          (dependent as any).firstName || dependent.name?.split(" ")[0] || "",
        lastName:
          (dependent as any).lastName ||
          dependent.name?.split(" ").slice(1).join(" ") ||
          "",
        dateOfBirth: dependent.dateOfBirth,
        gender: (dependent as any).gender || "male",
        relationship: (dependent as any).relationship || "child",
        ghanaCardNumber: (dependent as any).ghanaCardNumber || "",
        phoneNumber: (dependent as any).phoneNumber || "",
      });
    } else if (isCreate) {
      methods.reset({
        userId: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "male",
        relationship: "child",
        ghanaCardNumber: "",
        phoneNumber: "",
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
      if (isEdit && search.dependentId) {
        await updateMutation.mutateAsync({
          id: search.dependentId,
          data,
        });
      }

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

  // Convert users to search options
  const userSearchOptions: SearchOption[] =
    users?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      memberId: user.medsaveId,
    })) || [];

  const handleUserSelect = (option: SearchOption) => {
    methods.setValue("userId", option.id);
  };

  const handleUserClear = () => {
    methods.setValue("userId", "");
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
              <div className="space-y-2">
                <Label htmlFor="userSearch">Select Primary Member</Label>
                <StatementsSearch
                  options={userSearchOptions}
                  placeholder="Search for primary member..."
                  emptyText="No members found."
                  onSelect={handleUserSelect}
                  onClear={handleUserClear}
                />
              </div>

              <FormInput
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                required
                wrapperClassName="space-y-2"
              />

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
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

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
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <FormInput
                name="ghanaCardNumber"
                label="Ghana Card Number"
                placeholder="GHA-123456789-0"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="+233240000000"
                required
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
                    disabled={updateMutation.isPending}
                    className="flex-1"
                  >
                    {updateMutation.isPending
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
