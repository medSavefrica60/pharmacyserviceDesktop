import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/common/data-table/data-table";
import { useProviderClaimsTableColumns } from "@/hooks/common/table/columns/use-provider-claims-table-columns";
import { useProviderClaimsToolbar } from "@/hooks/common/table/toolbars/use-provider-claims-toolbar";
import { ProviderClaimsTableSkeleton } from "../skeletons/provider-claims-table-skeleton";
import {
  useGetProvider,
  useGetProviderClaims,
} from "@/hooks/api/use-providers";

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

  const handleClose = () => {
    navigate({
      to: "/providers",
      search: { sheet: undefined, dialog: undefined, providerId: undefined },
    });
  };

  // Extract claims from API response
  const claims = claimsData?.data?.claims || [];
  const total = claimsData?.data?.total || 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-7xl w-full max-h-[85vh] flex flex-col p-2">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Provider Claims</DialogTitle>
          <DialogDescription>
            {provider
              ? `View all claims for ${provider.organizationName}`
              : "View all claims for this provider"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <ProviderClaimsTableSkeleton />
          ) : (
            <DataTable
              data={claims}
              className="border-0 flex-1 w-full"
              count={total}
              limit={20}
              pageSizeOptions={[10, 20, 50, 100]}
              columns={columns}
              Toolbar={useProviderClaimsToolbar}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
