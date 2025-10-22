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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  DollarSignIcon,
  PackageIcon,
  CheckCircleIcon,
  XCircleIcon,
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
      <SheetContent className="sm:max-w-md overflow-hidden flex flex-col p-0">
        <SheetHeader className="px-6 pt-6">
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
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="flex flex-col gap-6">
              {/* Package Header */}
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-primary/10 p-4">
                  <PackageIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{medication.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">
                    {medication.id.split("-")[0]}...
                  </p>
                </div>
                <Badge
                  variant={
                    medication.status === "ACTIVE" ? "default" : "secondary"
                  }
                  className={cn(
                    "px-4 py-1",
                    medication.status === "ACTIVE"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : medication.status === "INACTIVE"
                        ? "bg-gray-50 text-gray-500 border-gray-200"
                        : "bg-red-50 text-red-600 border-red-200"
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
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Minimum Amount</p>
                    <p className="text-sm text-muted-foreground font-semibold">
                      ₵{medication.minAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-muted p-2">
                    {medication.isActive ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Active Status</p>
                    <p className="text-sm text-muted-foreground">
                      {medication.isActive ? "Active" : "Inactive"}
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
                      {medication.createdAt
                        ? new Date(medication.createdAt).toLocaleDateString(
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
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {medication.updatedAt
                        ? new Date(medication.updatedAt).toLocaleDateString(
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
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2 pb-4">
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
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Package not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
