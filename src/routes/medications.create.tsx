import { createFileRoute } from "@tanstack/react-router";
import CreateMedication from "@/modules/medication-packages/upsert/create-medication";

export const Route = createFileRoute("/medications/create")({
  component: CreateMedicationPage,
  validateSearch: () => ({}),
});

function CreateMedicationPage() {
  return <CreateMedication />;
}
