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
import { FormTextarea } from "@/components/common/form/form-textarea";
import { FormSelect } from "@/components/common/form/form-select";
import { useEffect } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerSchema, type ProviderFormData } from "@/lib/zod/providers";

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
    resolver: zodResolver(providerSchema),
    defaultValues: {
      email: "test.provider@example.com",
      organizationName: "Test Medical Center",
      licenseNumber: "LCN-2025-TEST001",
      address: "123 Test Street, Test City, Test Region, Ghana",
      contactPhone: "+233500000000",
      status: "PENDING_VERIFICATION",
    },
  });

  // Reset form when provider data is loaded
  useEffect(() => {
    if (provider && isEdit) {
      methods.reset({
        email: provider.email,
        organizationName: provider.organizationName,
        licenseNumber: provider.licenseNumber,
        address: provider.address,
        contactPhone: provider.contactPhone,
        status: provider.status,
      });
    } else if (isCreate) {
      methods.reset({
        email: "test.provider@example.com",
        organizationName: "Test Medical Center",
        licenseNumber: "LCN-2025-TEST001",
        address: "123 Test Street, Test City, Test Region, Ghana",
        contactPhone: "+233500000000",
        status: "PENDING_VERIFICATION",
      });
    }
  }, [provider, isEdit, isCreate, methods]);

  const handleClose = () => {
    navigate({
      to: "/providers",
      search: { sheet: undefined, dialog: undefined, providerId: undefined },
    });
    // Reset to test values for next time
    if (isCreate) {
      methods.reset({
        email: "test.provider@example.com",
        organizationName: "Test Medical Center",
        licenseNumber: "LCN-2025-TEST001",
        address: "123 Test Street, Test City, Test Region, Ghana",
        contactPhone: "+233500000000",
        status: "PENDING_VERIFICATION",
      });
    }
  };

  const onSubmit = async (data: ProviderFormData) => {
    try {
      if (isEdit && search.providerId) {
        await upsertMutation.mutateAsync({
          id: search.providerId,
          data,
        });
      }

      if (isCreate) {
        await upsertMutation.mutateAsync({
          id: null,
          data,
        });
      }

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
                name="organizationName"
                label="Organization Name"
                placeholder="Enter organization name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="licenseNumber"
                label="License Number"
                placeholder="Enter license number (e.g., LCN-2025-001235)"
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
                name="contactPhone"
                label="Contact Phone"
                type="tel"
                placeholder="Enter phone number (e.g., +233592330177)"
                required
                wrapperClassName="space-y-2"
              />

              <FormTextarea
                name="address"
                label="Address"
                placeholder="Enter complete address"
                required
                wrapperClassName="space-y-2"
                rows={3}
              />

              <FormSelect
                name="status"
                label="Status"
                placeholder="Select status"
                required
                wrapperClassName="space-y-2"
                options={[
                  { label: "Active", value: "ACTIVE" },
                  {
                    label: "Pending Verification",
                    value: "PENDING_VERIFICATION",
                  },
                  { label: "Suspended", value: "SUSPENDED" },
                ]}
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
