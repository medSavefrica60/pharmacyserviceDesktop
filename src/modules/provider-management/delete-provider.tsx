import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProvider, useGetProvider } from "@/hooks/api/use-providers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";

export const DeleteProvider = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/providers" }) as {
    dialog?: string;
    providerId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.providerId;
  const { data: provider } = useGetProvider(search.providerId);
  const deleteMutation = useDeleteProvider();

  const handleClose = () => {
    navigate({
      to: "/providers",
      search: { dialog: undefined, providerId: undefined },
    });
  };

  const handleDelete = async () => {
    if (!search.providerId) return;

    try {
      await deleteMutation.mutateAsync(search.providerId);
      toast.success("Provider deleted successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to delete provider");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            </div>
            <DialogTitle>Delete Provider</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to delete this provider? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {provider && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{provider.organizationName}</p>
              <p className="text-sm text-muted-foreground">{provider.email}</p>
              <p className="text-xs text-muted-foreground">
                {provider.licenseNumber}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Provider"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
