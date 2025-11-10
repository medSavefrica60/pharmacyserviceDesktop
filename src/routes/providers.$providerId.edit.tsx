import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import ProviderInformation from "@/modules/provider-management/forms/provider-information";
import { useGetProvider } from "@/hooks/api/use-providers";
import { Trash2 } from "lucide-react";
import { DeleteProvider } from "@/modules/provider-management/delete-provider";
import ProviderVerificationDocuments from "@/modules/provider-management/forms/provider-verification-documents";
import { CaretUpIcon } from "@radix-ui/react-icons";
import { ViewProviderClaims } from "@/modules/provider-management/misc/provider-claims";

export const Route = createFileRoute("/providers/$providerId/edit")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      view: (search.view as string | undefined) || undefined,
      dialog: (search.dialog as string | undefined) || undefined,
      providerId: (search.providerId as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { providerId } = Route.useParams();
  const search = useSearch({ from: "/providers/$providerId/edit" }) as {
    view?: string;
    dialog?: string;
    providerId?: string;
  };
  const { data: provider, isLoading } = useGetProvider(providerId);
  const showComplexView = search.view === "complex";

  const handleDelete = () => {
    navigate({
      to: "/providers/$providerId/edit",
      params: { providerId: providerId! },
      search: {
        view: undefined,
        dialog: "delete",
        providerId: providerId!,
      },
    });
  };

  const handleViewClaims = () => {
    navigate({
      to: "/providers/$providerId/edit",
      params: { providerId: providerId! },
      search: { view: undefined, dialog: "claims", providerId: providerId! },
    });
  };

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <div className="flex h-full flex-1 flex-col pb-24">
          <div className="mb-6">
            <ProviderInformation provider={provider} isLoading={isLoading} />
          </div>
          {showComplexView && (
            <div className="mb-6">
              <ProviderVerificationDocuments
                provider={provider}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
        <span className="fixed bottom-0 left-0 right-0 flex justify-center py-4 border-t self-start bg-background space-x-2">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-2 py-1.5 bg-medsave-error-200 text-white rounded-xl hover:bg-medsave-error-300"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete Provider</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-2 py-1.5 bg-primary/80 text-primary-foreground rounded-xl hover:bg-primary/90 shadow-xs"
            onClick={handleViewClaims}
          >
            <CaretUpIcon className="w-4 h-4" />
            <span className="text-sm font-medium">View Claims</span>
          </button>
        </span>
      </main>
      <DeleteProvider />
      <ViewProviderClaims />
    </>
  );
}
