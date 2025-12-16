import { FormSelect } from "@/components/common/form/form-select";
import { FormTextarea } from "@/components/common/form/form-textarea";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useUpdateAdmin } from "@/hooks/api/use-admins";
import { Admin } from "@/types";
import { logger } from "@/lib/logger";
import { z } from "zod";

const AdminStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
  statusReason: z.string().optional(),
});

type AdminStatusFormData = z.infer<typeof AdminStatusSchema>;

type AdminStatusProps = {
  admin: Admin | undefined;
  isLoading: boolean;
};

export default function AdminStatus({ admin, isLoading }: AdminStatusProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();
  const updateMutation = useUpdateAdmin();
  const form = useForm<AdminStatusFormData>({
    resolver: zodResolver(AdminStatusSchema),
    defaultValues: {
      status: "ACTIVE",
      statusReason: "",
    },
  });

  const onSubmit = (data: AdminStatusFormData) => {
    startSavingTransition(async () => {
      if (!admin?.id) return;
      toast.loading("Updating admin status...");
      updateMutation
        .mutateAsync({
          id: admin.id,
          data: {
            status: data.status,
            statusReason: data.statusReason,
          } as any,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Admin status updated successfully", {
            duration: 3000,
          });
          logger.info("Admin status updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("An error occurred while updating admin status", error);
          toast.error("An error occurred while updating admin status");
        });
    });
  };

  useEffect(() => {
    if (admin) {
      form.reset({
        status: admin?.status || "ACTIVE",
        statusReason: (admin as any)?.statusReason || "",
      });
    }
  }, [admin, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Admin Status
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
              label="Status"
              description="The current status of the admin account"
              isLoading={isLoading}
            >
              <FormSelect
                name="status"
                placeholder="Select status"
                disabled={!isEditing}
                options={[
                  { label: "Active", value: "ACTIVE" },
                  { label: "Inactive", value: "INACTIVE" },
                  { label: "Suspended", value: "SUSPENDED" },
                ]}
                selectClassName="h-15 w-full"
              />
            </FormFieldWrapper>

            <FormFieldWrapper
              label="Reason"
              description="Provide a reason for the status change (optional)"
              isLoading={isLoading}
            >
              <FormTextarea
                name="statusReason"
                textareaClassName="h-15 w-full disabled:bg-medsave-black-50 disabled:border-medsave-black-100 disabled:cursor-not-allowed"
                placeholder="Enter reason for status change..."
                disabled={!isEditing}
                rows={3}
              />
            </FormFieldWrapper>
          </div>
        </section>
      </form>
    </Form>
  );
}

