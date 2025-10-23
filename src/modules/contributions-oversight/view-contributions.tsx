import { DataTable } from "@/components/common/data-table/data-table";
import { useGetContributions } from "@/hooks/api/use-contributions";
import { useContributionsTableColumns } from "@/hooks/common/table/columns/use-contributions-table-columns";

export const ViewContributions = () => {
  const columns = useContributionsTableColumns();
  const { data: contributions, isLoading } = useGetContributions();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Loading contributions...
          </p>
        </div>
      </div>
    );
  }

  const contributionData = contributions || [];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Contributions Oversight</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and track all member contributions
          </p>
        </div>
      </div>

      {contributionData.length > 0 ? (
        <DataTable
          data={contributionData}
          className=""
          count={contributionData.length}
          limit={100}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          columns={columns}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <span className="flex flex-col items-center rounded-md p-8 gap-4 max-w-96">
            <div className="rounded-full bg-muted p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <p className="text-center text-sm text-medsave-black-500 font-semibold">
              No Contributions Yet
            </p>
            <p className="text-center text-sm text-medsave-black-300">
              No contributions have been recorded yet. Contributions will appear
              here once members make payments.
            </p>
          </span>
        </div>
      )}
    </div>
  );
};
