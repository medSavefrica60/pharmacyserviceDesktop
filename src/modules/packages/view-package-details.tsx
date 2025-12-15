import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const ViewPackageDetails = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/medications" }) as {
    dialog?: string;
    medicationId?: string;
  };

  const isOpen = search.dialog === "details" && !!search.medicationId;

  const handleClose = () => {
    navigate({
      to: "/medications",
      search: { dialog: undefined, medicationId: undefined },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl! w-full max-h-[85vh] flex flex-col p-2">
        <DialogHeader className="px-6">
          <DialogTitle>Package Details</DialogTitle>
          <DialogDescription>
            View detailed information about this package
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center py-8 px-6">
          <p className="text-sm text-muted-foreground">
            Package details coming soon...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
