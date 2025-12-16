"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/common/form/form-input";
import { FormSelect } from "@/components/common/form/form-select";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import {
  useCreateDependent,
  useUpdateDependent,
  useGetDependent,
} from "@/hooks/api/use-dependents";
import { useSearch, useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";

const addDependentSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  relationship: z.enum(["spouse", "child", "parent", "sibling", "other"], {
    message: "Relationship must be spouse, child, parent, sibling, or other",
  }),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+233\d{9}$/,
      "Please enter a valid Ghana phone number (+233XXXXXXXXX)"
    ),
});

type AddDependentFormData = z.infer<typeof addDependentSchema>;

export const AddDependentDialog = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users/$userId/edit" }) as {
    dialog?: string;
    userId?: string;
    dependentId?: string;
  };

  const isEdit = search.dialog === "edit-dependent" && !!search.dependentId;
  const isCreate = search.dialog === "add-dependent" && !!search.userId;
  const isOpen = isEdit || isCreate;
  const userId = search.userId;
  const dependentId = search.dependentId;

  const { data: dependent, isLoading: isLoadingDependent } = useGetDependent(
    isEdit ? dependentId : undefined
  );

  const form = useForm<AddDependentFormData>({
    resolver: zodResolver(addDependentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      relationship: "child",
      phoneNumber: "",
    },
  });

  const createMutation = useCreateDependent();
  const updateMutation = useUpdateDependent();

  // Load dependent data when editing
  useEffect(() => {
    if (dependent && isEdit) {
      const nameParts = dependent.dependentName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      form.reset({
        firstName,
        lastName,
        relationship: dependent.relationship as
          | "spouse"
          | "child"
          | "parent"
          | "sibling"
          | "other",
        phoneNumber: dependent.dependentPhone,
      });
    } else if (isCreate) {
      form.reset({
        firstName: "",
        lastName: "",
        relationship: "child",
        phoneNumber: "",
      });
    }
  }, [dependent, isEdit, isCreate, form]);

  const handleClose = () => {
    form.reset();
    navigate({
      to: "/users/$userId/edit",
      params: { userId: userId || "" },
      search: {
        dialog: undefined,
        userId: userId || "",
        dependentId: undefined,
      },
    });
  };

  const onSubmit = (data: AddDependentFormData) => {
    if (isEdit) {
      if (!dependentId) {
        toast.error("Dependent ID is required");
        return;
      }

      toast.loading("Updating dependent...");
      updateMutation
        .mutateAsync({
          id: dependentId,
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            relationship: data.relationship,
            phoneNumber: data.phoneNumber,
          },
        })
        .then(() => {
          toast.dismiss();
          toast.success("Dependent updated successfully");
          logger.info("Dependent updated successfully");
          handleClose();
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("Failed to update dependent", error);
          toast.error("Failed to update dependent");
        });
    } else {
      if (!userId) {
        toast.error("User ID is required");
        return;
      }

      toast.loading("Adding dependent...");
      createMutation
        .mutateAsync({
          userId,
          firstName: data.firstName,
          lastName: data.lastName,
          relationship: data.relationship,
          phoneNumber: data.phoneNumber,
        })
        .then(() => {
          toast.dismiss();
          toast.success("Dependent added successfully");
          logger.info("Dependent added successfully");
          handleClose();
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("Failed to add dependent", error);
          toast.error("Failed to add dependent");
        });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Dependent" : "Add Dependent"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the dependent information below."
              : "Add a new dependent for this user. Fill in the required information below."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 py-4">
              <FormFieldWrapper
                label="First Name"
                description="The first name of the dependent"
                isLoading={isLoadingDependent}
              >
                <FormInput
                  name="firstName"
                  inputClassName="h-[52px]! w-full"
                  type="text"
                  placeholder="e.g. John"
                  disabled={isLoadingDependent}
                />
              </FormFieldWrapper>

              <FormFieldWrapper
                label="Last Name"
                description="The last name of the dependent"
              >
                <FormInput
                  name="lastName"
                  inputClassName="h-[52px]! w-full"
                  type="text"
                  placeholder="e.g. Doe"
                  disabled={isLoadingDependent}
                />
              </FormFieldWrapper>

              <FormFieldWrapper
                label="Relationship"
                description="The relationship to the user"
              >
                <FormSelect
                  name="relationship"
                  selectClassName="h-[52px]! w-full"
                  options={[
                    { label: "Spouse", value: "spouse" },
                    { label: "Child", value: "child" },
                    { label: "Parent", value: "parent" },
                    { label: "Sibling", value: "sibling" },
                    { label: "Other", value: "other" },
                  ]}
                  disabled={isLoadingDependent}
                />
              </FormFieldWrapper>

              <FormFieldWrapper
                label="Phone Number"
                description="The phone number of the dependent"
              >
                <FormInput
                  name="phoneNumber"
                  inputClassName="h-[52px]! w-full"
                  type="tel"
                  placeholder="e.g. +233543482182"
                  disabled={isLoadingDependent}
                />
              </FormFieldWrapper>
            </div>

            <DialogFooter className="border-t pt-4 mt-4">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={handleClose}
                disabled={isLoadingDependent}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isPending || isLoadingDependent}
              >
                {isPending ? "Saving..." : isEdit ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
