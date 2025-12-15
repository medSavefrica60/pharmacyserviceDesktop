import { FormInput } from "@/components/common/form/form-input";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { CreateActionButtons } from "@/components/common/misc/creat-actions";
import { Form } from "@/components/ui/form";
import { useUpsertUser } from "@/hooks/api/use-users";
import { OfficerFormData, OfficerSchema } from "@/lib/zod/users";
import { BaseFailedResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FormSelect } from "@/components/common/form/form-select";

type OfficerRole =
  | "IT_OFFICER"
  | "CLAIMS_OFFICER"
  | "FINANCE_OFFICER"
  | "CUSTOMER_CARE";

interface CreateOfficerFormProps {
  defaultRole?: OfficerRole;
}

const ROLE_OPTIONS: Array<{ label: string; value: OfficerRole }> = [
  { label: "IT Officer", value: "IT_OFFICER" },
  { label: "Claims Officer", value: "CLAIMS_OFFICER" },
  { label: "Finance Officer", value: "FINANCE_OFFICER" },
  { label: "Customer Care", value: "CUSTOMER_CARE" },
];

export function CreateOfficerForm({ defaultRole }: CreateOfficerFormProps) {
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertUser();

  const form = useForm<OfficerFormData>({
    resolver: zodResolver(OfficerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: defaultRole || "IT_OFFICER",
    },
  });

  const onSubmit = (data: OfficerFormData) => {
    startSavingTransition(() => {
      toast.loading("Creating officer...");
      upsertMutation
        .mutateAsync({
          id: null,
          data,
        })
        .then(() => {
          toast.dismiss();
          toast.success("Officer created successfully");
        })
        .catch((error: BaseFailedResponse<{ message: string }>) => {
          toast.dismiss();
          toast.error(`Failed to create officer, ${error.error.message}`);
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
              description="The first name of the officer"
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
              description="The last name of the officer"
            >
              <FormInput
                name="lastName"
                inputClassName="h-15 w-full"
                type="text"
                placeholder="e.g. Steven"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Email Address"
              description="The email address for the officer's account"
            >
              <FormInput
                name="email"
                inputClassName="h-15 w-full"
                type="email"
                placeholder="e.g. john.steve.ur@gmail.com"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
            <FormFieldWrapper
              label="Role"
              description="The role assigned to the officer"
            >
              <FormSelect
                name="role"
                options={ROLE_OPTIONS}
                placeholder="Select a role"
                selectClassName="h-15 w-full"
                disabled={isSaving || upsertMutation.isPending}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}
