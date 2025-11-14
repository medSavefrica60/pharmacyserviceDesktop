import { FormInput } from "@/components/common/form/form-input";
import FormPhoneInput from "@/components/common/form/form-phone";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";

export default function PersonalInformation() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();

  const form = useForm<any>({
    // resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      organizationName: undefined,
      email: undefined,
      contactPhone: undefined,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    startSavingTransition(async () => {});
  };

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
            {/* <FormFieldWrapper
              label="Profile Picture"
              description="Upload your profile picture"
            >
              <UserAvatar />
            </FormFieldWrapper> */}

            <FormFieldWrapper
              label="Name"
              description="Your organization name or account display name"
            >
              <FormInput
                name="organizationName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="John Doe"
                disabled={!isEditing}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Email Address"
              description="Your email address for account notifications"
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
              description="Your contact phone number"
            >
              <FormPhoneInput
                name="contactPhone"
                label=""
                type="phone"
                className="disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                disabled={!isEditing}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
