import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useGetClaim, useUpdateClaim } from "@/hooks/api/use-claims";
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

type ClaimFormData = {
  claimNumber: string;
  patientName: string;
  patientId: string;
  providerName: string;
  providerId: string;
  serviceType: string;
  claimDate: string;
  claimAmount: string;
  approvedAmount: string;
  status: "Approved" | "Pending" | "Rejected" | "Processing";
};

export const UpdateClaim = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/claims" }) as {
    sheet?: string;
    claimId?: string;
  };

  const isEdit = search.sheet === "edit" && !!search.claimId;
  const isCreate = search.sheet === "create";
  const isOpen = isEdit || isCreate;

  const { data: claim, isLoading } = useGetClaim(
    isEdit ? search.claimId : undefined
  );
  const updateMutation = useUpdateClaim();

  const methods = useForm<ClaimFormData>({
    defaultValues: {
      claimNumber: "",
      patientName: "",
      patientId: "",
      providerName: "",
      providerId: "",
      serviceType: "",
      claimDate: "",
      claimAmount: "",
      approvedAmount: "",
      status: "Pending",
    },
  });

  // Reset form when claim data is loaded
  useEffect(() => {
    if (claim && isEdit) {
      methods.reset({
        claimNumber: claim.reference,
        patientName: `${claim.user.firstName} ${claim.user.lastName}`,
        patientId: claim.user.medsaveId,
        providerName: claim.provider.organizationName,
        providerId: claim.provider.id,
        serviceType: claim.medicationPackage.name,
        claimDate: claim.createdAt.split("T")[0],
        claimAmount: claim.amount,
        approvedAmount: claim.amount,
        status: claim.status as
          | "Approved"
          | "Pending"
          | "Rejected"
          | "Processing",
      });
    } else if (isCreate) {
      const today = new Date().toISOString().split("T")[0];
      methods.reset({
        claimNumber: `CLM-${Date.now().toString().slice(-6)}`,
        patientName: "",
        patientId: "",
        providerName: "",
        providerId: "",
        serviceType: "",
        claimDate: today,
        claimAmount: "",
        approvedAmount: "₵0.00",
        status: "Pending",
      });
    }
  }, [claim, isEdit, isCreate, methods]);

  const handleClose = () => {
    navigate({
      to: "/claims",
      search: { sheet: undefined, dialog: undefined, claimId: undefined },
    });
    methods.reset();
  };

  const onSubmit = async (data: ClaimFormData) => {
    try {
      if (isEdit && search.claimId) {
        await updateMutation.mutateAsync({
          id: search.claimId,
          data: {
            ...data,
            claimDate: new Date(data.claimDate).toISOString(),
          },
        });
      }

      toast.success(
        isEdit ? "Claim updated successfully" : "Claim submitted successfully"
      );
      handleClose();
    } catch (error) {
      toast.error(isEdit ? "Failed to update claim" : "Failed to submit claim");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="px-6">
          <SheetTitle>{isEdit ? "Edit Claim" : "Submit New Claim"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update claim information and status"
              : "Submit a new insurance claim"}
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
                name="claimNumber"
                label="Claim Number"
                placeholder="CLM-XXXXXX"
                required
                disabled={isEdit}
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="patientName"
                label="Patient Name"
                placeholder="Enter patient name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="patientId"
                label="Patient ID"
                placeholder="PT-XXXXXX"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="providerName"
                label="Provider Name"
                placeholder="Enter provider name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="providerId"
                label="Provider ID"
                placeholder="PRV-XXXXXX"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="serviceType"
                label="Service Type"
                placeholder="e.g., General Consultation"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="claimDate"
                label="Claim Date"
                type="date"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="claimAmount"
                label="Claim Amount"
                placeholder="₵0.00"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="approvedAmount"
                label="Approved Amount"
                placeholder="₵0.00"
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
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
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
                    disabled={updateMutation.isPending}
                    className="flex-1"
                  >
                    {updateMutation.isPending
                      ? "Saving..."
                      : isEdit
                        ? "Update Claim"
                        : "Submit Claim"}
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
