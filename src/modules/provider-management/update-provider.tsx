import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useGetProvider, useUpsertProvider } from "@/hooks/api/use-providers";
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

type ProviderFormData = {
  name: string;
  email: string;
  phone: string;
  facilityType: string;
  location: string;
  status: "Active" | "Inactive";
  providerId: string;
};

export const UpdateProvider = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/providers" }) as {
    sheet?: string;
    providerId?: string;
  };

  const isEdit = search.sheet === "edit" && !!search.providerId;
  const isCreate = search.sheet === "create";
  const isOpen = isEdit || isCreate;

  const { data: provider, isLoading } = useGetProvider(
    isEdit ? search.providerId : undefined
  );
  const upsertMutation = useUpsertProvider();

  const methods = useForm<ProviderFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      facilityType: "Clinic",
      location: "",
      status: "Active",
      providerId: "",
    },
  });

  // Reset form when provider data is loaded
  useEffect(() => {
    if (provider && isEdit) {
      methods.reset({
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        facilityType: provider.facilityType,
        location: provider.location,
        status: provider.status,
        providerId: provider.providerId,
      });
    } else if (isCreate) {
      methods.reset({
        name: "",
        email: "",
        phone: "",
        facilityType: "Clinic",
        location: "",
        status: "Active",
        providerId: `PRV${Date.now().toString().slice(-6)}`,
      });
    }
  }, [provider, isEdit, isCreate, methods]);

  const handleClose = () => {
    navigate({
      to: "/providers",
      search: { sheet: undefined, dialog: undefined, providerId: undefined },
    });
    methods.reset();
  };

  const onSubmit = async (data: ProviderFormData) => {
    try {
      await upsertMutation.mutateAsync({
        ...(isEdit && { id: search.providerId }),
        ...data,
        dateRegistered: provider?.dateRegistered || new Date().toISOString(),
      });

      toast.success(
        isEdit
          ? "Provider updated successfully"
          : "Provider created successfully"
      );
      handleClose();
    } catch (error) {
      toast.error(
        isEdit ? "Failed to update provider" : "Failed to create provider"
      );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="px-6">
          <SheetTitle>
            {isEdit ? "Edit Provider" : "Register New Provider"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update provider information and details"
              : "Add a new healthcare provider to the system"}
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
                label="Provider Name"
                placeholder="Enter provider/facility name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="providerId"
                label="Provider ID"
                placeholder="PRV123456"
                required
                disabled={isEdit}
                wrapperClassName="space-y-2"
              />

              <div className="space-y-2">
                <Label htmlFor="facilityType">Facility Type</Label>
                <Controller
                  name="facilityType"
                  control={methods.control}
                  rules={{ required: "Facility type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select facility type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="Clinic">Clinic</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Laboratory">Laboratory</SelectItem>
                        <SelectItem value="Diagnostic Center">
                          Diagnostic Center
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <FormInput
                name="location"
                label="Location"
                placeholder="Enter city/region"
                required
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
                        ? "Update Provider"
                        : "Register Provider"}
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
