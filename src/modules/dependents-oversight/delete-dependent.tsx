import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useDeleteDependent,
  useGetDependent,
} from "@/hooks/api/use-dependents";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangleIcon } from "lucide-react";

export const DeleteDependent = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/dependents" }) as {
    dialog?: string;
    dependentId?: string;
  };

  const isOpen = search.dialog === "delete" && !!search.dependentId;
  const { data: dependent } = useGetDependent(search.dependentId);
  const deleteMutation = useDeleteDependent();

  const handleClose = () => {
    navigate({
      to: "/dependents",
      search: { sheet: undefined, dialog: undefined, dependentId: undefined },
    });
  };

  const handleDelete = async () => {
    if (!search.dependentId) return;

    try {
      await deleteMutation.mutateAsync(search.dependentId);
      toast.success("Dependent removed successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to remove dependent");
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
            <DialogTitle>Remove Dependent</DialogTitle>
          </div>
          <DialogDescription className="pt-2">
            Are you sure you want to remove this dependent? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        {dependent && (
          <div className="rounded-md bg-muted p-4 my-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{dependent.name}</p>
              <p className="text-sm text-muted-foreground">
                {dependent.relationship} of {dependent.primaryMember}
              </p>
              <p className="text-xs text-muted-foreground">
                {dependent.dependentId}
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
            {deleteMutation.isPending ? "Removing..." : "Remove Dependent"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
