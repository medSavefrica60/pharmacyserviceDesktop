import { useState, useEffect } from "react";
import { DataTable } from "@/components/common/data-table/data-table";
import { useGetAllStatements } from "@/hooks/api/use-statements";
import { useStatementsTableColumns } from "@/hooks/common/table/columns/use-statements-table-columns";
import { useStatementsToolbar } from "./statements-toolbar";
import { SearchOption } from "./statements-search";
import { FileTextIcon } from "lucide-react";

export const ViewStatements = () => {
  const [selectedUser] = useState<SearchOption | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});
  const [page] = useState(1);
  const limit = 20;

  const columns = useStatementsTableColumns();

  // Get search options (users)

  // Get statements with filters
  const { data: statementsData, isLoading } = useGetAllStatements(
    {
      userId: selectedUser?.id,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    page,
    limit
  );

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

  //   const handleUserSelect = (user: SearchOption) => {
  //     setSelectedUser(user);
  //     setPage(1);
  //   };

  //   const handleDateRangeChange = (startDate: string, endDate: string) => {
  //     setDateRange({ startDate, endDate });
  //     setPage(1);
  //   };

  //   const handleDownload = () => {
  //     // TODO: Implement download functionality
  //     console.log("Download statements");
  //   };

  //   const handleClearFilters = () => {
  //     setSelectedUser(null);
  //     const now = new Date();
  //     const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  //     const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  //     setDateRange({
  //       startDate: lastMonth.toISOString().split("T")[0],
  //       endDate: endOfLastMonth.toISOString().split("T")[0],
  //     });
  //     setPage(1);
  //   };

  const statements = statementsData?.statements || [];
  const totalStatements = statementsData?.total || 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Statements Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage all statements
          </p>
        </div>
      </div>

      {/* Statements Table */}
      <div className="px-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">
              Loading statements...
            </p>
          </div>
        ) : statements ? (
          <DataTable
            data={statements}
            columns={columns}
            count={totalStatements}
            limit={limit}
            pageSizeOptions={[10, 20, 50, 100]}
            Toolbar={useStatementsToolbar}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center py-12">
            <span className="flex flex-col items-center rounded-md p-8 gap-4 max-w-96">
              <div className="rounded-full bg-muted p-4">
                <FileTextIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-center text-sm text-medsave-black-500 font-semibold">
                No Statements Found
              </p>
              <p className="text-center text-sm text-medsave-black-300">
                No statements found for the selected date range.
              </p>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
