import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProvider } from "@/hooks/api/use-providers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProviderDetailsSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/utils";
import {
  MailIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  IdCardIcon,
  ShieldCheckIcon,
  ClockIcon,
  DownloadIcon,
} from "lucide-react";

// Utility function to format file size
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const ViewProviderDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/providers" }) as {
    sheet?: string;
    providerId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.providerId;
  const { data: provider, isLoading } = useGetProvider(search.providerId);

  const handleClose = () => {
    navigate({
      to: "/providers",
      search: { sheet: undefined, dialog: undefined, providerId: undefined },
    });
  };

  const handleEdit = () => {
    navigate({
      to: "/providers",
      search: {
        sheet: "edit",
        dialog: undefined,
        providerId: search.providerId,
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md overflow-hidden flex flex-col p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Provider Details</SheetTitle>
          <SheetDescription>
            View detailed information about this provider
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <ProviderDetailsSkeleton />
        ) : provider ? (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Provider Avatar and Name */}
            <div className="flex flex-col items-center gap-3 px-6 py-4">
              <Avatar className="h-20 w-20">
                <AvatarImage alt={provider.organizationName} />
                <AvatarFallback className="text-xl font-semibold">
                  {provider.organizationName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {provider.organizationName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {provider.licenseNumber}
                </p>
              </div>
              <Badge
                variant={provider.status === "ACTIVE" ? "default" : "secondary"}
                className={cn(
                  "px-4 py-1",
                  provider.status === "ACTIVE"
                    ? "bg-green-50 text-green-600 border-green-200"
                    : provider.status === "PENDING_VERIFICATION"
                      ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                )}
              >
                {provider.status.replace(/_/g, " ")}
              </Badge>
            </div>

            <Tabs
              defaultValue="general"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="mx-6 grid w-auto grid-cols-2">
                <TabsTrigger value="general">General Info</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              {/* General Information Tab */}
              <TabsContent
                value="general"
                className="flex-1 overflow-hidden mt-0"
              >
                <ScrollArea className="h-full px-6 py-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">License Number</p>
                        <p className="text-sm text-muted-foreground">
                          {provider.licenseNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          {provider.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Email Address</p>
                        <p className="text-sm text-muted-foreground">
                          {provider.email}
                        </p>
                        {provider.emailVerifiedAt && (
                          <div className="flex items-center gap-1 mt-1">
                            <ShieldCheckIcon className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">
                              Verified
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Phone Number</p>
                        <p className="text-sm text-muted-foreground">
                          {provider.contactPhone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Date Registered</p>
                        <p className="text-sm text-muted-foreground">
                          {provider.createdAt
                            ? new Date(provider.createdAt).toLocaleDateString(
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

                    {provider.lastLoginAt && (
                      <div className="flex items-start gap-3">
                        <div className="rounded-md bg-muted p-2">
                          <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Last Login</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(provider.lastLoginAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          {provider.lastLoginIp && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              IP: {provider.lastLoginIp}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <Separator className="my-6" />

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button onClick={handleEdit} className="flex-1">
                        Edit Provider
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate({
                            to: "/providers",
                            search: {
                              sheet: undefined,
                              dialog: "delete",
                              providerId: provider.id,
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
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent
                value="documents"
                className="flex-1 overflow-hidden mt-0"
              >
                <div className="px-6 py-4 h-full">
                  <div className="flex flex-col space-y-4">
                    <p className="font-semibold text-lg leading-[140%]">
                      Verification Documents
                    </p>
                    <ScrollArea className="h-[calc(100vh-400px)]">
                      <div className="flex flex-col gap-2.5 pr-4">
                        {provider.verificationDocuments &&
                        provider.verificationDocuments.length > 0 ? (
                          provider.verificationDocuments.map((file, idx) => (
                            <div
                              key={`${file.fileName}-${idx}`}
                              className="rounded-md border bg-accent"
                            >
                              <div className="p-2 flex items-center gap-3">
                                <div className="h-12 w-12 rounded-md border bg-blue-50 flex items-center justify-center text-lg overflow-hidden">
                                  {file.fileName.match(
                                    /\.(jpg|jpeg|png|gif|webp)$/i
                                  ) ? (
                                    <img
                                      src={file.filePath}
                                      alt={file.fileName}
                                      className="object-cover w-full h-full rounded"
                                    />
                                  ) : (
                                    "📄"
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p
                                    title={file.fileName}
                                    className="text-sm font-medium truncate"
                                  >
                                    {file.fileName}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs text-muted-foreground">
                                      {formatBytes(file.size, 2)}
                                    </p>
                                    <Badge
                                      variant={
                                        file.verified ? "default" : "secondary"
                                      }
                                      className={cn(
                                        "text-xs px-2 py-0",
                                        file.verified
                                          ? "bg-green-50 text-green-600 border-green-200"
                                          : "bg-gray-50 text-gray-500 border-gray-200"
                                      )}
                                    >
                                      {file.verified ? "Verified" : "Pending"}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {file.type.replace(/_/g, " ")}
                                  </p>
                                </div>

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 z-1 text-muted-foreground hover:text-foreground hover:bg-blue-100"
                                  title="Download file"
                                >
                                  <DownloadIcon className="h-4 w-4 text-blue-600" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center justify-center py-12">
                            <p className="text-sm text-muted-foreground">
                              No documents uploaded
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 px-6">
            <p className="text-sm text-muted-foreground">Provider not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
