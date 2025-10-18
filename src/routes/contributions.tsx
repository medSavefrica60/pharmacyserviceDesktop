import { createFileRoute } from "@tanstack/react-router";
import {
  ViewContributions,
  ViewContributionDetails,
  DeleteContribution,
} from "@/modules/contributions-oversight";

export const Route = createFileRoute("/contributions")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      contributionId: (search.contributionId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewContributions />
      <ViewContributionDetails />
      <DeleteContribution />
    </>
  );
}
