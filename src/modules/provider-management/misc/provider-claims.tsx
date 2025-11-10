import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DataTable } from "@/components/common/data-table/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { useProviderClaimsTableColumns } from "@/hooks/common/table/columns/use-provider-claims-table-columns";
import { useProviderClaimsToolbar } from "@/hooks/common/table/toolbars/use-provider-claims-toolbar";
import {
  useGetProvider,
  useGetProviderClaims,
} from "@/hooks/api/use-providers";
import { ProviderClaimsMetrics } from "./provider-claims-metrics";

export const ViewProviderClaims = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/providers" }) as {
    dialog?: string;
    providerId?: string;
  };

  const isOpen = search.dialog === "claims" && !!search.providerId;
  const { data: provider } = useGetProvider(search.providerId);
  const { data: claimsData, isLoading } = useGetProviderClaims(
    search.providerId
  );
  const columns = useProviderClaimsTableColumns();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({
        to: "/providers",
        search: { dialog: undefined, providerId: undefined },
      });
    }
  };

  // Extract claims from API response
  const claims = claimsData?.data?.claims || [];
  const total = claimsData?.data?.total || 0;

  return (
    <Sheet open={isOpen as boolean} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="!max-w-[120rem] w-full max-h-[85vh] flex flex-col p-2"
      >
        <SheetHeader className="px-6 pb-4">
          <SheetTitle className="text-xl">Provider Claims</SheetTitle>
          <SheetDescription>
            {provider
              ? `View all claims for ${provider.organizationName}`
              : "View all claims for this provider"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden px-6 pb-6 gap-4">
          {isLoading ? (
            <>
              <ProviderClaimsMetrics isLoading={true} />
              <DataTableSkeleton
                columnCount={7}
                rowCount={10}
                searchableColumnCount={1}
                filterableColumnCount={1}
                showViewOptions={true}
                cellWidths={[
                  "120px",
                  "200px",
                  "150px",
                  "120px",
                  "100px",
                  "120px",
                  "100px",
                ]}
              />
            </>
          ) : (
            <>
              <ProviderClaimsMetrics
                claimsData={claimsData}
                isLoading={false}
              />
              <DataTable
                data={claims}
                className="border-0 flex-1 w-full"
                count={total}
                limit={20}
                pageSizeOptions={[10, 20, 50, 100]}
                columns={columns}
                Toolbar={useProviderClaimsToolbar}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
