import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetClaim } from "@/hooks/api/use-claims";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  UserIcon,
  BuildingIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  HashIcon,
  CopyIcon,
  CopyCheckIcon,
  InfoIcon,
  HistoryIcon,
} from "lucide-react";
import { useState } from "react";

export const ViewClaimDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/claims" }) as {
    dialog?: string;
    claimId?: string;
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isOpen = search.dialog === "details" && !!search.claimId;
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
        sheet: undefined,
        dialog: "edit",
        claimId: search.claimId,
      },
    });
  };

  const handleCopyId = async (id: string) => {
    setCopiedId(id);
    await navigator.clipboard.writeText(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-4xl w-full max-h-[85vh] flex flex-col p-2">
        <DialogHeader className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Claim Details</DialogTitle>
              <DialogDescription>
                Comprehensive information about this claim
              </DialogDescription>
            </div>
            <Badge
              variant={claim?.status === "approved" ? "default" : "secondary"}
              className={cn(
                "px-3 py-1 text-sm font-medium capitalize",
                claim?.status === "approved"
                  ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                  : claim?.status === "pending"
                    ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                    : claim?.status === "rejected"
                      ? "bg-red-50 text-red-600 border-red-200"
                      : claim?.status === "expired"
                        ? "bg-orange-50 text-orange-600 border-orange-200"
                        : claim?.status === "cancelled"
                          ? "bg-gray-50 text-gray-600 border-gray-200"
                          : "bg-gray-50 text-gray-600 border-gray-200"
              )}
            >
              {claim?.status}
            </Badge>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                Loading claim details...
              </p>
            </div>
          </div>
        ) : claim ? (
          <div className="px-6 pb-6">
            {/* Claim Header Card */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/20 p-3">
                    <FileTextIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {claim.reference}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Claim Code: {claim.claimCode}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    GH₵{" "}
                    {parseFloat(claim.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">Claim Amount</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="overview"
                  className="flex items-center gap-2"
                >
                  <InfoIcon className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="flex items-center gap-2"
                >
                  <HistoryIcon className="h-4 w-4" />
                  Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="flex items-center gap-2"
                >
                  <HashIcon className="h-4 w-4" />
                  Details
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Main Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Information */}
                  {claim.user && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-primary" />
                        User Information
                      </h4>
                      <div className="bg-card rounded-lg border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Name
                            </p>
                            <p className="font-semibold">
                              {claim.user.firstName} {claim.user.lastName}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCopyId(claim.user.id)}
                            className="p-2 hover:bg-muted rounded-md transition-colors"
                          >
                            {copiedId === claim.user.id ? (
                              <CopyCheckIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <CopyIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {claim.user.medsaveId && (
                            <div>
                              <p className="text-xs text-muted-foreground">
                                MedSave ID
                              </p>
                              <p className="text-sm font-medium">
                                {claim.user.medsaveId}
                              </p>
                            </div>
                          )}
                          {claim.user.phoneNumber && (
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Phone
                              </p>
                              <p className="text-sm font-medium">
                                {claim.user.phoneNumber}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Provider Information */}
                  {claim.provider && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2">
                        <BuildingIcon className="h-5 w-5 text-primary" />
                        Provider Information
                      </h4>
                      <div className="bg-card rounded-lg border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Organization
                            </p>
                            <p className="font-semibold">
                              {claim.provider.organizationName}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCopyId(claim.provider.id)}
                            className="p-2 hover:bg-muted rounded-md transition-colors"
                          >
                            {copiedId === claim.provider.id ? (
                              <CopyCheckIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <CopyIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {claim.provider.contactPhone && (
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Contact Phone
                              </p>
                              <p className="text-sm font-medium">
                                {claim.provider.contactPhone}
                              </p>
                            </div>
                          )}
                          {claim.provider.email && (
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Email
                              </p>
                              <p className="text-sm font-medium text-primary">
                                {claim.provider.email}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Package */}
                {claim.package && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <FileTextIcon className="h-5 w-5 text-primary" />
                      Package
                    </h4>
                    <div className="bg-card rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">
                            Package Name
                          </p>
                          <p className="text-lg font-semibold">
                            {claim.package.name}
                          </p>
                          {claim.package.minAmount && (
                            <p className="text-sm text-muted-foreground">
                              Minimum Amount: GH₵{" "}
                              {claim.package.minAmount}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            handleCopyId(claim.package.id)
                          }
                          className="p-2 hover:bg-muted rounded-md transition-colors"
                        >
                          {copiedId === claim.package.id ? (
                            <CopyCheckIcon className="h-4 w-4 text-green-600" />
                          ) : (
                            <CopyIcon className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="mt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    Timeline & Status
                  </h4>
                  <div className="bg-card rounded-lg border p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {claim.createdAt && (
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-blue-100 p-2">
                            <CalendarIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Created
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(claim.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(claim.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      {claim.approvedAt && (
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-green-100 p-2">
                            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Approved
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(claim.approvedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(claim.approvedAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      {claim.expiresAt && (
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "rounded-full p-2",
                              new Date(claim.expiresAt) < new Date()
                                ? "bg-red-100"
                                : "bg-yellow-100"
                            )}
                          >
                            <ClockIcon
                              className={cn(
                                "h-4 w-4",
                                new Date(claim.expiresAt) < new Date()
                                  ? "text-red-600"
                                  : "text-yellow-600"
                              )}
                            />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Expires
                            </p>
                            <p
                              className={cn(
                                "text-sm font-medium",
                                new Date(claim.expiresAt) < new Date()
                                  ? "text-red-600"
                                  : "text-foreground"
                              )}
                            >
                              {new Date(claim.expiresAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(claim.expiresAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                              {new Date(claim.expiresAt) < new Date() &&
                                " (Expired)"}
                            </p>
                          </div>
                        </div>
                      )}

                      {claim.updatedAt && (
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-gray-100 p-2">
                            <CalendarIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Last Updated
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(claim.updatedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(claim.updatedAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="mt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <HashIcon className="h-5 w-5 text-primary" />
                    Technical Details
                  </h4>
                  <div className="bg-card rounded-lg border p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {claim.id && (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Claim ID
                            </p>
                            <p className="text-sm font-mono font-medium">
                              {claim.id.slice(0, 8)}...
                            </p>
                          </div>
                          <button
                            onClick={() => handleCopyId(claim.id)}
                            className="p-2 hover:bg-muted rounded-md transition-colors"
                          >
                            {copiedId === claim.id ? (
                              <CopyCheckIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <CopyIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      )}
                      {claim.reference && (
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Reference
                          </p>
                          <p className="text-sm font-mono font-medium">
                            {claim.reference}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t mt-6">
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
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-muted p-4">
                <FileTextIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Claim not found</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
