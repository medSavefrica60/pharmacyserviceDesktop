"use client";

import { DataTable } from "@/components/common/data-table/data-table";
import { useGetClaims } from "@/hooks/api/use-claims";
import { useClaimsTableColumns } from "@/hooks/common/table/columns/use-claims-table-columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const ViewClaims = () => {
  const columns = useClaimsTableColumns();
  const { data: claims, isLoading } = useGetClaims();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Loading claims...</p>
        </div>
      </div>
    );
  }

  const claimData = claims || [];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Claims Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and process insurance claims
          </p>
        </div>
        <Button
          onClick={() =>
            navigate({
              to: "/claims",
              search: {
                sheet: "create",
                dialog: undefined,
                claimId: undefined,
              },
            })
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Submit Claim
        </Button>
      </div>

      {claimData.length > 0 ? (
        <DataTable
          data={claimData}
          className=""
          count={claimData.length}
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <p className="text-center text-sm text-medsave-black-500 font-semibold">
              No Claims Yet
            </p>
            <p className="text-center text-sm text-medsave-black-300">
              No claims have been submitted yet. Submit your first claim to get
              started.
            </p>
            <Button
              onClick={() =>
                navigate({
                  to: "/claims",
                  search: {
                    sheet: "create",
                    dialog: undefined,
                    claimId: undefined,
                  },
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Submit Claim
            </Button>
          </span>
        </div>
      )}
    </div>
  );
};
