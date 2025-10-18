import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetPackage } from "@/hooks/api/use-packages";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  DollarSignIcon,
  ClockIcon,
  ShieldIcon,
  UsersIcon,
  PackageIcon,
  IdCardIcon,
} from "lucide-react";

export const ViewPackageDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/packages" }) as {
    sheet?: string;
    packageId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.packageId;
  const { data: packageData, isLoading } = useGetPackage(search.packageId);

  const handleClose = () => {
    navigate({
      to: "/packages",
      search: {
        sheet: undefined,
        dialog: undefined,
        packageId: undefined,
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Package Details</SheetTitle>
          <SheetDescription>
            View detailed information about this medication package
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : packageData ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* Package Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-muted p-4">
                <PackageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{packageData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {packageData.packageId}
                </p>
              </div>
              <Badge
                variant={
                  packageData.status === "Active" ? "default" : "secondary"
                }
                className={cn(
                  "px-4 py-1",
                  packageData.status === "Active"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : packageData.status === "Inactive"
                      ? "bg-gray-50 text-gray-600 border-gray-200"
                      : "bg-red-50 text-red-600 border-red-200"
                )}
              >
                {packageData.status}
              </Badge>
            </div>

            <Separator />

            {/* Package Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <PackageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {packageData.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-lg font-semibold text-medsave-black-500">
                    {packageData.price}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {packageData.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Coverage</p>
                  <p className="text-sm text-muted-foreground">
                    {packageData.coverage}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Active Members</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {packageData.memberCount} members
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Created Date</p>
                  <p className="text-sm text-muted-foreground">
                    {packageData.createdAt
                      ? new Date(packageData.createdAt).toLocaleDateString(
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
                  <p className="text-sm font-medium">Package ID</p>
                  <p className="text-sm text-muted-foreground">
                    {packageData.packageId}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/packages",
                    search: {
                      sheet: undefined,
                      dialog: "delete",
                      packageId: packageData.id,
                    },
                  })
                }
                className="flex-1"
              >
                Delete Package
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Package not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
