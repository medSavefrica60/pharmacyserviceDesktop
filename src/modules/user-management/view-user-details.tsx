import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetUser } from "@/hooks/api/use-users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MailIcon, CalendarIcon, UserIcon, ShieldIcon } from "lucide-react";

export const ViewUserDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    sheet?: string;
    userId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.userId;
  const { data: user, isLoading } = useGetUser(search.userId);

  const handleClose = () => {
    navigate({
      to: "/users",
      search: { sheet: undefined, dialog: undefined, userId: undefined },
    });
  };

  const handleEdit = () => {
    navigate({
      to: "/users",
      search: { sheet: "edit", dialog: undefined, userId: search.userId },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            View detailed information about this user
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : user ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* User Avatar and Name */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar || `https://github.com/shadcn.png?size=160`}
                  alt={user.name}
                />
                <AvatarFallback className="text-xl font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {user.medsaveId}
                </p>
              </div>
              <Badge
                variant={user.status === "Active" ? "default" : "secondary"}
                className={cn(
                  "px-4 py-1",
                  user.status === "Active"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : "bg-gray-50 text-gray-500 border-gray-200"
                )}
              >
                {user.status}
              </Badge>
            </div>

            <Separator />

            {/* User Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <MailIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Email Address</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Date Joined</p>
                  <p className="text-sm text-muted-foreground">
                    {user.dateJoined
                      ? new Date(user.dateJoined).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">MedSave ID</p>
                  <p className="text-sm text-muted-foreground">
                    {user.medsaveId}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleEdit} className="flex-1">
                Edit User
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/users",
                    search: {
                      sheet: undefined,
                      dialog: "delete",
                      userId: user.id,
                    },
                  })
                }
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">User not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
