import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export const ViewPackageDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/packages" }) as {
    sheet?: string;
    packageId?: string;
  };

  const isOpen = search.sheet === "details" && !!search.packageId;

  const handleClose = () => {
    navigate({
      to: "/packages",
      search: { sheet: undefined, dialog: undefined, packageId: undefined },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="px-6">
          <SheetTitle>Package Details</SheetTitle>
          <SheetDescription>
            View detailed information about this package
          </SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-center py-8 px-6">
          <p className="text-sm text-muted-foreground">
            Package details coming soon...
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
