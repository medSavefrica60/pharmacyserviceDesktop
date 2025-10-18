import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useGetStatement } from "@/hooks/api/use-statements";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  UserIcon,
  ClockIcon,
  IdCardIcon,
} from "lucide-react";

export const ViewStatementDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/statements" }) as {
    sheet?: string;
    statementId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.statementId;
  const { data: statement, isLoading } = useGetStatement(search.statementId);

  const handleClose = () => {
    navigate({
      to: "/statements",
      search: {
        sheet: undefined,
        dialog: undefined,
        statementId: undefined,
      },
    });
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log("Download PDF for:", statement?.statementId);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Statement Details</SheetTitle>
          <SheetDescription>
            View detailed information about this statement
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : statement ? (
          <div className="flex flex-col gap-6 py-4 px-6">
            {/* Statement Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-muted p-4">
                <FileTextIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {statement.statementId}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {statement.period}
                </p>
              </div>
              <Badge
                variant={statement.status === "Paid" ? "default" : "secondary"}
                className={cn(
                  "px-4 py-1",
                  statement.status === "Paid"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : statement.status === "Pending"
                      ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                      : "bg-red-50 text-red-600 border-red-200"
                )}
              >
                {statement.status}
              </Badge>
            </div>

            <Separator />

            {/* Statement Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-sm text-muted-foreground">
                    {statement.userName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {statement.userId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-lg font-semibold text-medsave-black-500">
                    {statement.totalAmount}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Period</p>
                  <p className="text-sm text-muted-foreground">
                    {statement.period}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {statement.startDate} to {statement.endDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-md bg-muted p-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Generated Date</p>
                  <p className="text-sm text-muted-foreground">
                    {statement.generatedDate
                      ? new Date(statement.generatedDate).toLocaleDateString(
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
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm text-muted-foreground">
                    {statement.dueDate
                      ? new Date(statement.dueDate).toLocaleDateString(
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
                  <p className="text-sm font-medium">Statement ID</p>
                  <p className="text-sm text-muted-foreground">
                    {statement.statementId}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleDownloadPDF} className="flex-1">
                Download PDF
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Statement not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
