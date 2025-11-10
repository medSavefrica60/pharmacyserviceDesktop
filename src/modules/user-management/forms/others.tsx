import { FormInput } from "@/components/common/form/form-input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { UserFormData, UserSchema } from "@/lib/zod/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useUpsertUser } from "@/hooks/api/use-users";
import { User } from "@/types";
import { logger } from "@/lib/logger";

type OthersProps = {
  user: User | undefined;
  isLoading: boolean;
};

export default function Others({ user, isLoading }: OthersProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertUser();
  const form = useForm<Pick<UserFormData, "dateOfBirth">>({
    resolver: zodResolver(UserSchema.pick({ dateOfBirth: true })),
    defaultValues: {
      dateOfBirth: "",
      // ghanaCardNumber: "",
    },
  });

  const onSubmit = (data: Pick<UserFormData, "dateOfBirth">) => {
    console.log(data);
    startSavingTransition(async () => {
      toast.loading("Updating others...");
      upsertMutation
        .mutateAsync({
          id: user?.id || null,
          data,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Others updated successfully", {
            duration: 3000,
          });
          logger.info("Others updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("An error occurred while updating others", error);
          toast.error("An error occurred while updating others", error);
        });
    });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        dateOfBirth: user?.dateOfBirth || "",
        // ghanaCardNumber: user?.ghanaCardNumber || "",
      });
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">Others</h1>
          <EditActionButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSaving={isSaving}
          />
        </header>
        <section className="p-4 border">
          <div className="flex flex-col space-y-6">
            <FormFieldWrapper
              label="Date of Birth"
              description="The date of birth of the user"
              isLoading={isLoading}
            >
              <FormInput
                name="dateOfBirth"
                inputClassName="h-15 w-full"
                type="date"
                disabled={!isEditing}
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Ghana Card Number"
              description="The Ghana Card number of the user"
              isLoading={isLoading}
            >
              <FormInput
                name="ghanaCardNumber"
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
