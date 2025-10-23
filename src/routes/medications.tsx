import { createFileRoute } from "@tanstack/react-router";
import { ViewMedications } from "@/modules/medication-packages/view-medications";
import { ViewMedicationDetails } from "@/modules/medication-packages/view-medication-details";
import { UpdateMedication } from "@/modules/medication-packages/upsert-medications";
import { DeleteMedication } from "@/modules/medication-packages/delete-medication";

export const Route = createFileRoute("/medications")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      medicationId: (search.medicationId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewMedications />
      <ViewMedicationDetails />
      <UpdateMedication />
      <DeleteMedication />
    </>
  );
}
