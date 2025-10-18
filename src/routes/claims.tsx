import { createFileRoute } from "@tanstack/react-router";
import {
  ViewClaims,
  ViewClaimDetails,
  UpdateClaim,
  DeleteClaim,
} from "@/modules/claims-management";

export const Route = createFileRoute("/claims")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      claimId: (search.claimId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewClaims />
      <ViewClaimDetails />
      <UpdateClaim />
      <DeleteClaim />
    </>
  );
}
