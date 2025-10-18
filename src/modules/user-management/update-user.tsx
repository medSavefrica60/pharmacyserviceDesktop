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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

type UserFormData = {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  medsaveId: string;
};

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
    defaultValues: {
      name: "",
      email: "",
      role: "Staff",
      status: "Active",
      medsaveId: "",
    },
  });

  // Reset form when user data is loaded
  useEffect(() => {
    if (user && isEdit) {
      methods.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        medsaveId: user.medsaveId,
      });
    } else if (isCreate) {
      methods.reset({
        name: "",
        email: "",
        role: "Staff",
        status: "Active",
        medsaveId: `MS${Date.now().toString().slice(-6)}`,
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
        ...(isEdit && { id: search.userId }),
        ...data,
        dateJoined: user?.dateJoined || new Date().toISOString(),
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
                name="name"
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
                name="medsaveId"
                label="MedSave ID"
                placeholder="MS123456"
                required
                disabled={isEdit}
                wrapperClassName="space-y-2"
              />

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Controller
                  name="role"
                  control={methods.control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrator">
                          Administrator
                        </SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Staff">Staff</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={methods.control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

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
