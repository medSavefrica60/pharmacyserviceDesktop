import { createFileRoute, useSearch } from "@tanstack/react-router";
import ProviderInformation from "@/modules/provider-management/forms/provider-information";
import ProviderMetadata from "@/modules/provider-management/forms/provider-metadata";
import { ProviderActionsBar } from "@/modules/provider-management/components/provider-actions-bar";
import { useGetProvider } from "@/hooks/api/use-providers";
import { DeleteProvider } from "@/modules/provider-management/delete-provider";
import ProviderVerificationDocuments from "@/modules/provider-management/forms/provider-verification-documents";
import { ViewProviderClaims } from "@/modules/provider-management/misc/provider-claims";
import ProviderSubscribedPackages from "@/modules/provider-management/components/provider-subscribed-packages";
import ProviderPaymentInformation from "@/modules/provider-management/components/provider-payment-information";
import { Scroller } from "@/components/ui/scroller";

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
  const { providerId } = Route.useParams();
  const search = useSearch({ from: "/providers/$providerId/edit" }) as {
    view?: string;
    dialog?: string;
    providerId?: string;
  };
  const { data: provider, isLoading } = useGetProvider(providerId);
  const showComplexView = search.view === "complex";

  return (
    <>
      <main className="min-h-full flex flex-col relative">
        <Scroller className="flex-1 pb-24" orientation="vertical">
          <div className="flex flex-col space-y-6 px-4 py-6">
            <div>
              <ProviderInformation provider={provider} isLoading={isLoading} />
            </div>
            {showComplexView && (
              <div>
                <ProviderVerificationDocuments
                  provider={provider}
                  isLoading={isLoading}
                />
              </div>
            )}
            <div>
              <ProviderMetadata provider={provider} isLoading={isLoading} />
            </div>
            <div>
              <ProviderSubscribedPackages
                provider={provider}
                isLoading={isLoading}
              />
            </div>
            <div>
              <ProviderPaymentInformation
                provider={provider}
                isLoading={isLoading}
              />
            </div>
          </div>
        </Scroller>
        <ProviderActionsBar providerId={providerId} />
      </main>
      <DeleteProvider />
      <ViewProviderClaims />
    </>
  );
}
