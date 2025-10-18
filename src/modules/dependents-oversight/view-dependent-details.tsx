import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetDependent } from "@/hooks/api/use-dependents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  UserIcon,
  IdCardIcon,
  Users2Icon,
  CakeIcon,
} from "lucide-react";

export const ViewDependentDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/dependents" }) as {
    sheet?: string;
    dependentId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.dependentId;
  const { data: dependent, isLoading } = useGetDependent(search.dependentId);

  const handleClose = () => {
    navigate({
      to: "/dependents",
      search: { sheet: undefined, dialog: undefined, dependentId: undefined },
    });
  };

  const handleEdit = () => {
    navigate({
      to: "/dependents",
      search: {
        sheet: "edit",
        dialog: undefined,
        dependentId: search.dependentId,
      },
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Dependent Details</SheetTitle>
          <SheetDescription>
            View detailed information about this dependent
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : dependent ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* Dependent Avatar and Name */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={
                    dependent.avatar || `https://github.com/shadcn.png?size=160`
                  }
                  alt={dependent.name}
                />
                <AvatarFallback className="text-xl font-semibold">
                  {dependent.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{dependent.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {dependent.dependentId}
                </p>
              </div>
              <Badge
                variant={
                  dependent.status === "Active" ? "default" : "secondary"
                }
                className={cn(
                  "px-4 py-1",
                  dependent.status === "Active"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : "bg-gray-50 text-gray-500 border-gray-200"
                )}
              >
                {dependent.status}
              </Badge>
            </div>

            <Separator />

            {/* Dependent Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Relationship</p>
                  <p className="text-sm text-muted-foreground">
                    {dependent.relationship}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <Users2Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Primary Member</p>
                  <p className="text-sm text-muted-foreground">
                    {dependent.primaryMember}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dependent.primaryMemberId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CakeIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">
                    {dependent.dateOfBirth
                      ? new Date(dependent.dateOfBirth).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                  {dependent.dateOfBirth && (
                    <p className="text-xs text-muted-foreground">
                      Age: {calculateAge(dependent.dateOfBirth)} years
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Gender</p>
                  <p className="text-sm text-muted-foreground">
                    {dependent.gender}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Date Added</p>
                  <p className="text-sm text-muted-foreground">
                    {dependent.dateAdded
                      ? new Date(dependent.dateAdded).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dependent ID</p>
                  <p className="text-sm text-muted-foreground">
                    {dependent.dependentId}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleEdit} className="flex-1">
                Edit Dependent
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/dependents",
                    search: {
                      sheet: undefined,
                      dialog: "delete",
                      dependentId: dependent.id,
                    },
                  })
                }
                className="flex-1"
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Dependent not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
