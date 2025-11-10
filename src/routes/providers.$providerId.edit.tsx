import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProviderInformation from "@/modules/provider-management/forms/provider-information";
import { useGetProvider } from "@/hooks/api/use-providers";
import { Trash2 } from "lucide-react";
import { DeleteProvider } from "@/modules/provider-management/delete-provider";

export const Route = createFileRoute("/providers/$providerId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { providerId } = Route.useParams();
  const { data: provider, isLoading } = useGetProvider(providerId);

  const handleDelete = () => {
    navigate({
      to: "/providers/$providerId/edit",
      params: { providerId: providerId! },
      search: { providerId: providerId!, dialog: "delete" },
    });
  };

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <ProviderInformation provider={provider} isLoading={isLoading} />
          </div>
        </div>
        <span className="fixed bottom-0 left-0 right-0 flex justify-center py-4 border-t self-start bg-background">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-2 py-1.5 bg-medsave-error-200 text-white rounded-xl hover:bg-medsave-error-300"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete Provider</span>
          </button>
        </span>
      </main>
      <DeleteProvider />
    </>
  );
}
