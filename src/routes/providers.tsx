import { createFileRoute } from "@tanstack/react-router";
import {
  ViewProviders,
  ViewProviderDetails,
  UpdateProvider,
  DeleteProvider,
  ViewProviderClaims,
} from "@/modules/provider-management";

export const Route = createFileRoute("/providers")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      providerId: (search.providerId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewProviders />
      <ViewProviderDetails />
      <UpdateProvider />
      <DeleteProvider />
      <ViewProviderClaims />
    </>
  );
}
