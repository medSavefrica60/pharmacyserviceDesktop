import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetContribution } from "@/hooks/api/use-contributions";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const ViewContributionDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/contributions" }) as {
    sheet?: string;
    contributionId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.contributionId;
  const { data: contribution, isLoading } = useGetContribution(
    search.contributionId
  );

  const handleClose = () => {
    navigate({
      to: "/contributions",
      search: {
        sheet: undefined,
        dialog: undefined,
        contributionId: undefined,
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Contribution Details</SheetTitle>
          <SheetDescription>
            View detailed information about this contribution
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : contribution ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* Member Avatar and Name */}
            {/* <div className="flex flex-col items-center gap-3">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={
                    contribution.avatar ||
                    `https://github.com/shadcn.png?size=160`
                  }
                  alt={contribution.memberName}
                />
                <AvatarFallback className="text-xl font-semibold">
                  {contribution.memberName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {contribution.memberName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {contribution.contributionId}
                </p>
              </div>
              <Badge
                variant={
                  contribution.status === "Completed" ? "default" : "secondary"
                }
                className={cn(
                  "px-4 py-1",
                  contribution.status === "Completed"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : contribution.status === "Pending"
                      ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                      : "bg-red-50 text-red-600 border-red-200"
                )}
              >
                {contribution.status}
              </Badge>
            </div> */}

            <Separator />

            {/* Contribution Information */}
            {/* <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Member</p>
                  <p className="text-sm text-muted-foreground">
                    {contribution.memberName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contribution.memberId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <PackageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Package</p>
                  <p className="text-sm text-muted-foreground">
                    {contribution.packageName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Amount Paid</p>
                  <p className="text-lg font-semibold text-medsave-black-500">
                    {contribution.amount}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">
                    {contribution.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment Date</p>
                  <p className="text-sm text-muted-foreground">
                    {contribution.paymentDate
                      ? new Date(contribution.paymentDate).toLocaleDateString(
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
                  <p className="text-sm font-medium">Contribution ID</p>
                  <p className="text-sm text-muted-foreground">
                    {contribution.contributionId}
                  </p>
                </div>
              </div>
            </div> */}

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/contributions",
                    search: {
                      sheet: undefined,
                      dialog: "delete",
                      contributionId: contribution.data.id,
                    },
                  })
                }
                className="flex-1"
              >
                Delete Record
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">
              Contribution not found
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
