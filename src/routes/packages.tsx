import { createFileRoute } from "@tanstack/react-router";
import {
  ViewPackages,
  ViewPackageDetails,
  DeletePackage,
} from "@/modules/medication-packages";

export const Route = createFileRoute("/packages")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      sheet: (search.sheet as string) || undefined,
      dialog: (search.dialog as string) || undefined,
      packageId: (search.packageId as string) || undefined,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <ViewPackages />
      <ViewPackageDetails />
      <DeletePackage />
    </>
  );
}
