import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ViewMedications, DeleteMedication } from "@/modules/medication-packages";
import { ViewMedicationDetails } from "@/modules/medication-packages/view-medication-details";

export const Route = createFileRoute("/medications")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      dialog: (search.dialog as string | undefined) || undefined,
      medicationId: (search.medicationId as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isExactMedicationsRoute = currentPath === "/medications";

  return (
    <>
      {isExactMedicationsRoute ? (
        <>
          <ViewMedications />
          <ViewMedicationDetails />
          <DeleteMedication />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}
