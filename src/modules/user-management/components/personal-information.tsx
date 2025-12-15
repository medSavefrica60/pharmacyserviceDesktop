import { FormInput } from "@/components/common/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { User } from "@/types";
import { UserFormData, UserSchema } from "@/lib/zod/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertUser } from "@/hooks/api/use-users";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";

type PersonalInformationProps = {
  user: User | undefined;
  isLoading: boolean;
};

export default function PersonalInformation({
  user,
  isLoading,
}: PersonalInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<
    Pick<UserFormData, "firstName" | "lastName" | "email" | "phoneNumber">
  >({
    resolver: zodResolver(
      UserSchema.pick({
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      })
    ),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertUser();

  const onSubmit = (
    data: Pick<UserFormData, "firstName" | "lastName" | "email" | "phoneNumber">
  ) => {
    console.log(data);
    startSavingTransition(async () => {
      toast.loading(
        `Updating Personal Information for ${user?.firstName} ${user?.lastName}`
      );
      upsertMutation
        .mutateAsync({
          id: user?.id || null,
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
          logger.error("An error occurred while updating the user", error);
          toast.error("An error occurred while updating the user", error);
        });
    });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
      });
    }
  }, [user, form]);

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
              description="The first name of the user"
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
              description="The last name of the user"
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
              description="The email address for the user's account"
              isLoading={isLoading}
            >
              <FormInput
                name="email"
                inputClassName="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                type="text"
                disabled={!isEditing}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Phone Number *"
              description="The contact phone number of the user"
              isLoading={isLoading}
            >
              <FormInput
                name="phoneNumber"
                inputClassName="h-15 w-full"
                type="tel"
                placeholder="e.g. +233240000000"
                disabled={true}
              />
            </FormFieldWrapper>
            <div className="flex flex-col space-y-2"></div>
          </div>
        </section>
      </form>
    </Form>
  );
}
