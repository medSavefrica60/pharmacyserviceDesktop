import { createFileRoute, useNavigate } from "@tanstack/react-router";
import MedicationInformation from "@/modules/medication-packages/upsert/medication-information";
import { useGetMedication } from "@/hooks/api/use-medications";
import { Trash2 } from "lucide-react";
import { DeleteMedication } from "@/modules/medication-packages/delete-medication";

export const Route = createFileRoute("/medications/$medicationId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { medicationId } = Route.useParams();
  const { data: medication, isLoading } = useGetMedication(medicationId);

  const handleDelete = () => {
    navigate({
      to: "/medications/$medicationId/edit",
      params: { medicationId: medicationId! },
      search: { medicationId: medicationId!, dialog: "delete" },
    });
  };

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <MedicationInformation medication={medication} isLoading={isLoading} />
          </div>
        </div>
        <span className="fixed bottom-0 left-0 right-0 flex justify-center py-4 border-t self-start bg-background">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-2 py-1.5 bg-medsave-error-200 text-white rounded-xl hover:bg-medsave-error-300"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete Medication</span>
          </button>
        </span>
      </main>
      <DeleteMedication />
    </>
  );
}
