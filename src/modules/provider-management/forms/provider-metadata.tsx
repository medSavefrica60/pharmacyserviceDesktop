import { Provider } from "@/types";
import FormFieldWrapper from "@/components/common/form/form-field-wrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ProviderMetadataProps = {
  provider: Provider | undefined;
  isLoading: boolean;
};

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
  } catch {
    return "N/A";
  }
};

const formatDateOnly = (dateString: string | null): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

export default function ProviderMetadata({
  provider,
  isLoading,
}: ProviderMetadataProps) {
  const isEmailVerified = !!provider?.emailVerifiedAt;
  const isAccountLocked = !!provider?.lockedUntil;

  return (
    <div>
      <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
        <h1 className="font-bold text-xl text-medsave-black-500">
          Provider Metadata
        </h1>
      </header>
      <section className="p-4 border">
        <div className="flex flex-col space-y-6">
          <FormFieldWrapper
            label="Status"
            description="The current status of the provider account"
            isLoading={isLoading}
          >
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <Badge
                variant={
                  provider?.status === "ACTIVE" ? "default" : "secondary"
                }
                className={cn(
                  "px-4 py-1.5 min-w-32 text-sm rounded-sm",
                  provider?.status === "ACTIVE"
                    ? "bg-medsave-success-50 text-medsave-success-500 border-medsave-success-100"
                    : provider?.status === "PENDING_VERIFICATION"
                      ? "bg-medsave-pending-50 text-medsave-pending-600 border-medsave-pending-100"
                      : "bg-red-50 text-red-600 border-red-200"
                )}
              >
                {provider?.status === "ACTIVE"
                  ? "Active"
                  : provider?.status === "PENDING_VERIFICATION"
                    ? "Pending Verification"
                    : "Suspended"}
              </Badge>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Email Verification"
            description="Whether the provider's email address has been verified"
            isLoading={isLoading}
          >
            {isLoading ? (
              <Skeleton className="h-5 w-5" />
            ) : (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isEmailVerified}
                  disabled
                  className="cursor-not-allowed border border-medsave-blue-600"
                />
                <span className="text-sm text-medsave-black-400">
                  {isEmailVerified
                    ? `Verified on ${formatDateOnly(provider?.emailVerifiedAt || null)}`
                    : "Not verified"}
                </span>
              </div>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Account Locked"
            description="Whether the provider account is currently locked"
            isLoading={isLoading}
          >
            {isLoading ? (
              <Skeleton className="h-5 w-5" />
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox checked={isAccountLocked} disabled />
                  <span className="text-sm text-medsave-black-400">
                    {isAccountLocked
                      ? "Account is locked"
                      : "Account is not locked"}
                  </span>
                </div>
                {isAccountLocked && provider?.lockedUntil && (
                  <span className="text-xs text-medsave-black-300 ml-7">
                    Locked until: {formatDate(provider.lockedUntil)}
                  </span>
                )}
              </div>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Last Login"
            description="The last time the provider logged into their account"
            isLoading={isLoading}
          >
            {isLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-medsave-black-400">
                  {provider?.lastLoginAt
                    ? formatDate(provider.lastLoginAt)
                    : "Never"}
                </span>
                {provider?.lastLoginIp && (
                  <span className="text-xs text-medsave-black-300">
                    IP Address: {provider.lastLoginIp}
                  </span>
                )}
              </div>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            label="Account Created"
            description="When the provider account was created"
            isLoading={isLoading}
          >
            {isLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <span className="text-sm font-medium text-medsave-black-400">
                {provider?.createdAt ? formatDate(provider.createdAt) : "N/A"}
              </span>
            )}
          </FormFieldWrapper>
        </div>
      </section>
    </div>
  );
}
