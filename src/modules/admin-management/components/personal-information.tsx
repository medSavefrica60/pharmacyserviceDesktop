import { FormInput } from "@/components/common/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { Admin } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAdmin } from "@/hooks/api/use-admins";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";
import { z } from "zod";

const AdminPersonalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type AdminPersonalInfoFormData = z.infer<typeof AdminPersonalInfoSchema>;

type PersonalInformationProps = {
  admin: Admin | undefined;
  isLoading: boolean;
};

export default function PersonalInformation({
  admin,
  isLoading,
}: PersonalInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<AdminPersonalInfoFormData>({
    resolver: zodResolver(AdminPersonalInfoSchema),
    defaultValues: {
      firstName: admin?.firstName || "",
      lastName: admin?.lastName || "",
      email: admin?.email || "",
    },
  });
  const [isSaving, startSavingTransition] = useTransition();
  const updateMutation = useUpdateAdmin();

  const onSubmit = (data: AdminPersonalInfoFormData) => {
    console.log(data);
    startSavingTransition(async () => {
      if (!admin?.id) return;
      toast.loading(
        `Updating Personal Information for ${admin?.firstName} ${admin?.lastName}`
      );
      updateMutation
        .mutateAsync({
          id: admin.id,
          data,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Personal Information updated successfully", {
            duration: 3000,
          });
          logger.info("Personal Information updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("An error occurred while updating the admin", error);
          toast.error("An error occurred while updating the admin");
        });
    });
  };

  useEffect(() => {
    if (admin) {
      form.reset({
        firstName: admin?.firstName || "",
        lastName: admin?.lastName || "",
        email: admin?.email || "",
      });
    }
  }, [admin, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Personal Information
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
              label="First Name"
              description="The first name of the admin"
              isLoading={isLoading}
            >
              <FormInput
                name="firstName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. John"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Last Name"
              description="The last name of the admin"
              isLoading={isLoading}
            >
              <FormInput
                name="lastName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Doe"
                disabled={!isEditing}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Email Address"
              description="The email address for the admin's account"
              isLoading={isLoading}
            >
              <FormInput
                name="email"
                inputClassName="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                type="text"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
