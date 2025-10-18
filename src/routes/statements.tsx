import { createFileRoute } from "@tanstack/react-router";
import {
  ViewStatements,
  ViewStatementDetails,
} from "@/modules/statements-management";

export const Route = createFileRoute("/statements")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      statementId: (search.statementId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewStatements />
      <ViewStatementDetails />
    </>
  );
}
