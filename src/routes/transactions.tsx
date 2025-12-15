import { createFileRoute } from "@tanstack/react-router";
import { ViewTransactions } from "@/modules/transactions-management/view-transactions";

export const Route = createFileRoute("/transactions")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      limit: (search.limit as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      transactionId: (search.transactionId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return <ViewTransactions />;
}
