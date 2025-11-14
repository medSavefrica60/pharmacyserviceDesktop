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
import { useUserClaimsTableColumns } from "@/hooks/common/table/columns/use-user-claims-table-columns";
import { useClaimsToolbar } from "@/hooks/common/table/toolbars/use-claims-toolbar";
import { useGetUser, useGetUserClaims } from "@/hooks/api/use-users";
import { UserClaimsMetrics } from "./user-claims-metrics";

export const ViewUserClaims = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/users" }) as {
    dialog?: string;
    userId?: string;
  };

  const isOpen = search.dialog === "claims" && !!search.userId;
  const { data: user } = useGetUser(search.userId);
  const { data: claimsData, isLoading } = useGetUserClaims(search.userId);
  const columns = useUserClaimsTableColumns();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate({
        to: "/users",
        search: { dialog: undefined, userId: undefined },
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
          <SheetTitle className="text-xl">User Claims</SheetTitle>
          <SheetDescription>
            {user
              ? `View all claims for ${user.firstName} ${user.lastName}`
              : "View all claims for this user"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 overflow-hidden px-6 pb-6 gap-4">
          {isLoading ? (
            <>
              <UserClaimsMetrics isLoading={true} />
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
              <UserClaimsMetrics claimsData={claimsData} isLoading={false} />
              <DataTable
                data={claims}
                className="border-0 flex-1 w-full"
                count={total}
                limit={20}
                pageSizeOptions={[10, 20, 50, 100]}
                columns={columns}
                Toolbar={useClaimsToolbar}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
