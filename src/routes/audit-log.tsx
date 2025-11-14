import { createFileRoute } from "@tanstack/react-router";
import { ViewAuditLogs } from "@/modules/audit-log-oversight";

export const Route = createFileRoute("/audit-log")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      limit: (search.limit as string) || undefined,
    };
  },
});

function RouteComponent() {
  return <ViewAuditLogs />;
}
