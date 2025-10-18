import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetMedication } from "@/hooks/api/use-medications";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  IdCardIcon,
  TagIcon,
  DollarSignIcon,
  ShieldCheckIcon,
  FileTextIcon,
} from "lucide-react";

export const ViewMedicationDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/medications" }) as {
    sheet?: string;
    medicationId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.medicationId;
  const { data: medication, isLoading } = useGetMedication(search.medicationId);

  const handleClose = () => {
    navigate({
      to: "/medications",
      search: { sheet: undefined, dialog: undefined, medicationId: undefined },
    });
  };

  const handleEdit = () => {
    navigate({
      to: "/medications",
      search: {
        sheet: "edit",
        dialog: undefined,
        medicationId: search.medicationId,
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
        ) : medication ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* Package Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-primary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M10.5 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V6.5L14 2h-3.5z" />
                  <path d="M14 2v6h6" />
                  <path d="M9 13h6" />
                  <path d="M9 17h6" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {medication.packageName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {medication.packageCode}
                </p>
              </div>
              <Badge
                variant={
                  medication.status === "Active" ? "default" : "secondary"
                }
                className={cn(
                  "px-4 py-1",
                  medication.status === "Active"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : medication.status === "Draft"
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                )}
              >
                {medication.status}
              </Badge>
            </div>

            <Separator />

            {/* Package Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <TagIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">
                    {medication.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Coverage</p>
                  <p className="text-sm text-muted-foreground">
                    {medication.coverage}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Monthly Premium</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {medication.monthlyPremium}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Annual Limit</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {medication.annualLimit}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {medication.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Date Created</p>
                  <p className="text-sm text-muted-foreground">
                    {medication.dateCreated
                      ? new Date(medication.dateCreated).toLocaleDateString(
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
                  <p className="text-sm font-medium">Package Code</p>
                  <p className="text-sm text-muted-foreground">
                    {medication.packageCode}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleEdit} className="flex-1">
                Edit Package
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/medications",
                    search: {
                      sheet: undefined,
                      dialog: "delete",
                      medicationId: medication.id,
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
            <p className="text-sm text-muted-foreground">Package not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
