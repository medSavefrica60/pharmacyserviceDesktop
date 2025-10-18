import { createFileRoute } from "@tanstack/react-router";
import {
  ViewDependents,
  ViewDependentDetails,
  UpdateDependent,
  DeleteDependent,
} from "@/modules/dependents-oversight";

export const Route = createFileRoute("/dependents")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      dependentId: (search.dependentId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewDependents />
      <ViewDependentDetails />
      <UpdateDependent />
      <DeleteDependent />
    </>
  );
}
