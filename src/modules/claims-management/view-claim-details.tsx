import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetClaim } from "@/hooks/api/use-claims";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  UserIcon,
  BuildingIcon,
  DollarSignIcon,
  FileTextIcon,
  IdCardIcon,
} from "lucide-react";

export const ViewClaimDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/claims" }) as {
    sheet?: string;
    claimId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.claimId;
  const { data: claim, isLoading } = useGetClaim(search.claimId);

  const handleClose = () => {
    navigate({
      to: "/claims",
      search: { sheet: undefined, dialog: undefined, claimId: undefined },
    });
  };

  const handleEdit = () => {
    navigate({
      to: "/claims",
      search: {
        sheet: "edit",
        dialog: undefined,
        claimId: search.claimId,
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Claim Details</SheetTitle>
          <SheetDescription>
            View detailed information about this claim
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : claim ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* Claim Header */}
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{claim.claimNumber}</h3>
                <p className="text-sm text-muted-foreground">
                  {claim.serviceType}
                </p>
              </div>
              <Badge
                variant={claim.status === "Approved" ? "default" : "secondary"}
                className={cn(
                  "px-4 py-1",
                  claim.status === "Approved"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : claim.status === "Processing"
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : claim.status === "Pending"
                        ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                        : "bg-red-50 text-red-600 border-red-200"
                )}
              >
                {claim.status}
              </Badge>
            </div>

            <Separator />

            {/* Claim Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Patient</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.patientName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {claim.patientId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Provider</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.providerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {claim.providerId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Service Type</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.serviceType}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Claim Date</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.claimDate
                      ? new Date(claim.claimDate).toLocaleDateString("en-US", {
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
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Claim Amount</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {claim.claimAmount}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Approved Amount</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {claim.approvedAmount}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Claim Number</p>
                  <p className="text-sm text-muted-foreground">
                    {claim.claimNumber}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleEdit} className="flex-1">
                Edit Claim
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/claims",
                    search: {
                      sheet: undefined,
                      dialog: "delete",
                      claimId: claim.id,
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
            <p className="text-sm text-muted-foreground">Claim not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
