import { FormInput } from "@/components/common/form/form-input";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { CreateActionButtons } from "@/components/common/misc/creat-actions";
import { Form } from "@/components/ui/form";
import { useUpsertUser } from "@/hooks/api/use-users";
import { CreateUserFormData, CreateUserSchema } from "@/lib/zod/users";
import { BaseFailedResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function MedsaveUserForm() {
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertUser();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      phoneNumber: "+233244111222",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dateOfBirth: "",
      ghanaCardNumber: "GHA-123456789-8",
    },
  });

  const onSubmit = (data: CreateUserFormData) => {
    startSavingTransition(() => {
      toast.loading("Creating user...");
      upsertMutation
        .mutateAsync({
          id: null,
          data,
        })
        .then(() => {
          toast.dismiss();
          toast.success("User created successfully");
        })
        .catch((error: BaseFailedResponse<{ message: string }>) => {
          toast.dismiss();
          toast.error(`Failed to create user, ${error.error.message}`);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Personal Information
          </h1>
          <CreateActionButtons
            isSaving={isSaving || upsertMutation.isPending}
            primaryProps={{ text: "Save", className: "bg-medsave-blue-500 " }}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="First Name"
              description="The first name of the user"
            >
              <FormInput
                name="firstName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. John"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Last Name"
              description="The last name of the user"
            >
              <FormInput
                name="lastName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Doe"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Email Address"
              description="The email address for the user's account"
            >
              <FormInput
                name="email"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. john.doe@example.com"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Phone Number *"
              description="The contact phone number of the user"
            >
              <FormInput
                name="phoneNumber"
                inputClassName="h-15 w-full"
                type="tel"
                placeholder="e.g. +233240000000"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Date of Birth"
              description="The date of birth of the user"
            >
              <FormInput
                name="dateOfBirth"
                inputClassName="h-15 w-full"
                type="date"
                placeholder="e.g. 1990-01-01"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Ghana Card Number"
              description="The Ghana Card number of the user"
            >
              <FormInput
                name="ghanaCardNumber"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. GHA-123456789-0"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
