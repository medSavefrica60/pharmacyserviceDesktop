import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { EditActionButtons } from "@/components/common/misc/edit-action-buttons";
import { Provider } from "@/types";
import { ProviderFormData, providerSchema } from "@/lib/zod/providers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpsertProvider } from "@/hooks/api/use-providers";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";
import { Scroller } from "@/components/ui/scroller";
import { cn, formatBytes } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { MedEmptyBoxIcon } from "@/components/common/icons";
import { Skeleton } from "@/components/ui/skeleton";

type ProviderVerificationDocumentsProps = {
  provider: Provider | undefined;
  isLoading: boolean;
};

export default function ProviderVerificationDocuments({
  provider,
  isLoading,
}: ProviderVerificationDocumentsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<
    Pick<
      ProviderFormData,
      | "organizationName"
      | "licenseNumber"
      | "email"
      | "contactPhone"
      | "address"
      | "status"
    >
  >({
    resolver: zodResolver(
      providerSchema.pick({
        organizationName: true,
        licenseNumber: true,
        email: true,
        contactPhone: true,
        address: true,
        status: true,
      })
    ),
    defaultValues: {
      organizationName: provider?.organizationName || "",
      licenseNumber: provider?.licenseNumber || "",
      email: provider?.email || "",
      contactPhone: provider?.contactPhone || "",
      address: provider?.address || "",
      status: provider?.status || "PENDING_VERIFICATION",
    },
  });
  const [isSaving, startSavingTransition] = useTransition();
  const upsertMutation = useUpsertProvider();

  const onSubmit = (
    data: Pick<
      ProviderFormData,
      | "organizationName"
      | "licenseNumber"
      | "email"
      | "contactPhone"
      | "address"
      | "status"
    >
  ) => {
    console.log(data);
    startSavingTransition(async () => {
      toast.loading(
        `Updating Provider Information for ${provider?.organizationName}`
      );
      upsertMutation
        .mutateAsync({
          id: provider?.id || null,
          data,
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Provider Information updated successfully", {
            duration: 3000,
          });
          logger.info("Provider Information updated successfully", response);
          setIsEditing(false);
        })
        .catch((error) => {
          toast.dismiss();
          logger.error("An error occurred while updating the provider", error);
          toast.error("An error occurred while updating the provider", error);
        });
    });
  };

  useEffect(() => {
    if (provider) {
      form.reset({
        organizationName: provider?.organizationName || "",
        licenseNumber: provider?.licenseNumber || "",
        email: provider?.email || "",
        contactPhone: provider?.contactPhone || "",
        address: provider?.address || "",
        status: provider?.status || "PENDING_VERIFICATION",
      });
    }
  }, [provider, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
          <h1 className="font-bold text-xl text-medsave-black-500">
            Verification Documents
          </h1>
          <EditActionButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSaving={isSaving}
          />
        </header>
        <section className="p-4 border">
          <Scroller className="h-[calc(100vh-600px)]">
            <div className="flex flex-col gap-2.5 pr-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="rounded-md border bg-accent"
                  >
                    <div className="p-2 flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-4 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                ))
              ) : provider?.verificationDocuments &&
                provider?.verificationDocuments.length > 0 ? (
                provider?.verificationDocuments.map((file, idx) => (
                  <div
                    key={`${file.fileName}-${idx}`}
                    className="rounded-md border bg-accent"
                  >
                    <div className="p-2 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md border bg-blue-50 flex items-center justify-center text-lg overflow-hidden">
                        {file.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
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
                            variant={file.verified ? "default" : "secondary"}
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
                <div className="flex flex-col items-center justify-center py-12">
                  <MedEmptyBoxIcon />
                  <p className="text-sm text-muted-foreground mt-4">
                    No verification documents uploaded
                  </p>
                </div>
              )}
            </div>
          </Scroller>
        </section>
      </form>
    </Form>
  );
}
