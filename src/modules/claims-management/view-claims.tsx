import { useState, useEffect } from "react";
import { DataTable } from "@/components/common/data-table/data-table";
import { useGetClaims } from "@/hooks/api/use-claims";
import { useGetProviders } from "@/hooks/api/use-providers";
import { useClaimsTableColumns } from "@/hooks/common/table/columns/use-claims-table-columns";
import { ClaimsSearchOption } from "./claims-search";
import { ClaimFilters, ClaimStatus } from "./claim-filters";
import { ClaimsTableSkeleton } from "./skeletons/claims-table-skeleton";
import { FileTextIcon } from "lucide-react";
import { logger } from "@/lib/logger";
import { Claim } from "@/types";

export const ViewClaims = () => {
  const [selectedProvider, setSelectedProvider] =
    useState<ClaimsSearchOption | null>(null);
  const [status, setStatus] = useState<ClaimStatus>("approved");
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [page] = useState(1);
  const limit = 20;

  const columns = useClaimsTableColumns();

  // Get providers for search
  const { data: providersData } = useGetProviders();
  const providers = providersData?.providers || [];

  // Transform providers to search options
  const providerOptions: ClaimsSearchOption[] = providers.map((provider) => ({
    id: provider.id,
    name: provider.organizationName,
    email: provider.email,
    licenseNumber: provider.licenseNumber,
    status: provider.status,
  }));

  // Get claims with filters
  const { data: claimsData, isLoading } = useGetClaims({
    providerId: selectedProvider?.id,
    status: status || undefined,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    page,
    limit,
  });

  // Set default date range (last month)
  useEffect(() => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    setDateRange({
      startDate: lastMonth.toISOString().split("T")[0],
      endDate: endOfLastMonth.toISOString().split("T")[0],
    });
  }, []);

  const handleProviderSelect = (provider: ClaimsSearchOption) => {
    logger.info("Provider selected", provider);
    setSelectedProvider(provider);
  };

  const handleProviderClear = () => {
    setSelectedProvider(null);
  };

  const handleStatusChange = (newStatus: ClaimStatus) => {
    setStatus(newStatus);
  };

  const handleDateRangeChange = (
    range: { from?: Date; to?: Date } | undefined
  ) => {
    if (range?.from && range?.to) {
      setDateRange({
        startDate: range.from.toISOString().split("T")[0],
        endDate: range.to.toISOString().split("T")[0],
      });
    }
  };

  const handleClearFilters = () => {
    setStatus("approved");
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    setDateRange({
      startDate: lastMonth.toISOString().split("T")[0],
      endDate: endOfLastMonth.toISOString().split("T")[0],
    });
  };

  const claims = (claimsData?.data?.claims as Claim[]) || [];
  const totalClaims = claimsData?.data?.total || 0;

  const dateRangeDisplay = {
    from: dateRange.startDate ? new Date(dateRange.startDate) : undefined,
    to: dateRange.endDate ? new Date(dateRange.endDate) : undefined,
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Claims Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage insurance claims
          </p>
        </div>
      </div>

      {/* Filters */}
      <ClaimFilters
        providerOptions={providerOptions}
        status={status}
        dateRangeDisplay={dateRangeDisplay}
        onProviderSelect={handleProviderSelect}
        onProviderClear={handleProviderClear}
        onStatusChange={handleStatusChange}
        onDateRangeChange={handleDateRangeChange}
        onClearFilters={handleClearFilters}
      />

      {/* Claims Table */}
      <div className="px-6">
        {isLoading ? (
          <ClaimsTableSkeleton />
        ) : claims && Array.isArray(claims) && claims.length > 0 ? (
          <DataTable
            data={claims}
            columns={columns}
            count={totalClaims}
            limit={limit}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center py-12">
            <span className="flex flex-col items-center rounded-md p-8 gap-4 max-w-96">
              <div className="rounded-full bg-muted p-4">
                <FileTextIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-center text-sm text-gray-900 font-semibold">
                No Claims Found
              </p>
              <p className="text-center text-sm text-gray-700">
                {selectedProvider
                  ? `No claims found for ${selectedProvider.name} in the selected date range.`
                  : "Select a provider to view their claims."}
              </p>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
