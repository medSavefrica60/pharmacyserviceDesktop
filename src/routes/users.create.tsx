import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateUserForm } from "@/modules/user-management/forms/create-user-form";
import { CreateProviderForm } from "@/modules/user-management/forms/create-provider-form";
import { CreateOfficerForm } from "@/modules/user-management/forms/create-officer-form";

export const Route = createFileRoute("/users/create")({
  component: CreateUserPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      userType: (search.userType as UserType | undefined) || undefined,
      userId: (search.userId as string | undefined) || undefined,
    };
  },
});

type UserType =
  | "IT_OFFICER"
  | "CLAIMS_OFFICER"
  | "FINANCE_OFFICER"
  | "CUSTOMER_CARE"
  | "MEDSAVE_USER"
  | "MEDSAVE_PROVIDER";

const USER_TYPE_OPTIONS: { label: string; value: UserType }[] = [
  { label: "IT Officer", value: "IT_OFFICER" },
  { label: "Claims Officer", value: "CLAIMS_OFFICER" },
  { label: "Finance Officer", value: "FINANCE_OFFICER" },
  { label: "Customer Care", value: "CUSTOMER_CARE" },
  { label: "Medsave User", value: "MEDSAVE_USER" },
  { label: "Medsave Provider", value: "MEDSAVE_PROVIDER" },
];

function CreateUserPage() {
  const { userType } = useSearch({ from: "/users/create" }) as {
    userType: UserType;
  };
  const [selectedUserType, setSelectedUserType] = useState<UserType>(
    userType || "MEDSAVE_USER"
  );

  const memoizeUserForm = useMemo(() => {
    switch (selectedUserType) {
      case "MEDSAVE_USER":
        return <CreateUserForm />;
      case "MEDSAVE_PROVIDER":
        return <CreateProviderForm />;
      case "IT_OFFICER":
      case "CLAIMS_OFFICER":
      case "FINANCE_OFFICER":
      case "CUSTOMER_CARE":
        return (
          <CreateOfficerForm
            defaultRole={
              selectedUserType as
                | "IT_OFFICER"
                | "CLAIMS_OFFICER"
                | "FINANCE_OFFICER"
                | "CUSTOMER_CARE"
            }
          />
        );
      default:
        return null;
    }
  }, [selectedUserType]);

  return (
    <main className="min-h-full flex flex-col space-y-4">
      <section className="p-4 rounded-xl bg-medsave-blue-50 sticky top-0 z-10">
        <FormFieldWrapper
          label="User Type"
          description="Select the type of user you want to create"
        >
          <Select
            value={selectedUserType}
            onValueChange={(value) => setSelectedUserType(value as UserType)}
          >
            <SelectTrigger className="h-[52px]! tracking-wide leading-loose! w-full bg-zinc-50 font-bold text-sm text-medsave-blue-400">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              {USER_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>
      </section>

      <section className="flex-1">{memoizeUserForm}</section>
    </main>
  );
}
