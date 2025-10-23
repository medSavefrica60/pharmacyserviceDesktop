import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useGetUser, useUpsertUser } from "@/hooks/api/use-users";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@/components/common/form/form-input";
import { useEffect } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "@/lib/zod/users";
import { FormDate } from "@/components/common/form/form-date";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    sheet?: string;
    userId?: string;
  };

  const isEdit = search.sheet === "edit" && !!search.userId;
  const isCreate = search.sheet === "create";
  const isOpen = isEdit || isCreate;

  const { data: user, isLoading } = useGetUser(
    isEdit ? search.userId : undefined
  );
  const upsertMutation = useUpsertUser();
  const methods = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      phoneNumber: "",
      fullName: "",
      email: "",
      pin: "",
      dateOfBirth: "",
      ghanaCardNumber: "",
    },
  });

  // Reset form when user data is loaded
  useEffect(() => {
    if (user && isEdit) {
      methods.reset({
        phoneNumber: (user as any).phoneNumber || "",
        fullName:
          (user as any).fullName || user.firstName + " " + user.lastName || "",
        email: user.email,
        pin: (user as any).pin || "",
        dateOfBirth: (user as any).dateOfBirth || "",
        ghanaCardNumber: (user as any).ghanaCardNumber || "",
      });
    } else if (isCreate) {
      methods.reset({
        phoneNumber: "+233244111222",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        pin: "5678",
        dateOfBirth: "1990-05-20",
        ghanaCardNumber: "GHA-123456789-0",
      });
    }
  }, [user, isEdit, isCreate, methods]);

  const handleClose = () => {
    navigate({
      to: "/users",
      search: { sheet: undefined, dialog: undefined, userId: undefined },
    });
    methods.reset();
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      await upsertMutation.mutateAsync({
        id: search.userId ? search.userId : null,
        data,
      });
      toast.success(
        isEdit ? "User updated successfully" : "User created successfully"
      );
      handleClose();
    } catch (error) {
      toast.error(isEdit ? "Failed to update user" : "Failed to create user");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="px-6">
          <SheetTitle>{isEdit ? "Edit User" : "Create New User"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update user information and permissions"
              : "Add a new user to the system"}
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
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="+233244111222"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="fullName"
                label="Full Name"
                placeholder="Enter full name"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="pin"
                label="PIN"
                type="password"
                placeholder="Enter 4-digit PIN"
                required
                maxLength={4}
                wrapperClassName="space-y-2"
              />

              <FormDate
                name="dateOfBirth"
                label="Date of Birth"
                required
                wrapperClassName="space-y-2"
              />

              <FormInput
                name="ghanaCardNumber"
                label="Ghana Card Number"
                placeholder="GHA-123456789-0"
                required
                wrapperClassName="space-y-2"
              />

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
                    disabled={upsertMutation.isPending}
                    className="flex-1"
                  >
                    {upsertMutation.isPending
                      ? "Saving..."
                      : isEdit
                        ? "Update User"
                        : "Create User"}
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
