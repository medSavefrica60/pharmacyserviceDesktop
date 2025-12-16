import { Scroller } from "@/components/ui/scroller";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MedEmptyBoxIcon } from "@/components/common/icons";
import { useGetDependents } from "@/hooks/api/use-dependents";
import { Dependent } from "@/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { UserPlus, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserDependentsProps = {
  userId: string;
  isLoading?: boolean;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
};

export const UserDependents = ({
  userId,
  isLoading: parentLoading,
}: UserDependentsProps) => {
  const navigate = useNavigate();
  const { data: dependentsData, isLoading: dependentsLoading } =
    useGetDependents({
      userId,
    });

  const isLoading = parentLoading || dependentsLoading;
  const dependents = dependentsData?.dependents || [];
  const dependentCount = dependents.length;

  const handleAddDependent = () => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { dialog: "add-dependent", userId, dependentId: undefined },
    });
  };

  const handleEditDependent = (dependentId: string) => {
    navigate({
      to: "/users/$userId/edit",
      params: { userId },
      search: { dialog: "edit-dependent", userId, dependentId },
    });
  };

  return (
    <div>
      <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
        <h1 className="font-bold text-xl text-medsave-black-500">
          Dependents {!isLoading && `(${dependentCount})`}
        </h1>
      </header>
      <section className="p-4 border">
        {isLoading ? (
          <Scroller className="h-[calc(100vh-800px)]">
            <div className="flex flex-col gap-2.5 pr-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="rounded-md border bg-accent"
                >
                  <div className="p-2 flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-20 rounded-full" />
                      </div>
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Scroller>
        ) : dependents.length > 0 ? (
          <Scroller className="h-[calc(100vh-800px)]">
            <div className="flex flex-col gap-2.5 pr-4">
              {dependents.map((dependent: Dependent) => (
                <div key={dependent.id} className="rounded-md border bg-accent">
                  <div className="p-2 flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-medsave-black-50">
                      <AvatarFallback className="text-sm font-medium text-medsave-black-300">
                        {dependent.dependentName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p
                        title={dependent.dependentName}
                        className="text-sm font-medium truncate"
                      >
                        {dependent.dependentName}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {dependent.dependentPhone}
                        </p>
                        <Badge
                          variant={
                            dependent.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={cn(
                            "text-xs px-2 py-0",
                            dependent.status === "active"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-gray-50 text-gray-500 border-gray-200"
                          )}
                        >
                          {dependent.status.charAt(0).toUpperCase() +
                            dependent.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground">
                          {dependent.relationship.charAt(0).toUpperCase() +
                            dependent.relationship.slice(1)}
                        </p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                          Added {formatDate(dependent.createdAt)}
                        </p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="hover:opacity-70">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2ZM12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM15.9482 11.0137C16.5012 11.0137 16.9482 11.4607 16.9482 12.0137C16.9482 12.5667 16.5012 13.0137 15.9482 13.0137C15.3952 13.0137 14.9432 12.5667 14.9432 12.0137C14.9432 11.4607 15.3862 11.0137 15.9382 11.0137H15.9482ZM11.9385 11.0137C12.4915 11.0137 12.9385 11.4607 12.9385 12.0137C12.9385 12.5667 12.4915 13.0137 11.9385 13.0137C11.3855 13.0137 10.9345 12.5667 10.9345 12.0137C10.9345 11.4607 11.3765 11.0137 11.9295 11.0137H11.9385ZM7.9297 11.0137C8.4827 11.0137 8.9297 11.4607 8.9297 12.0137C8.9297 12.5667 8.4827 13.0137 7.9297 13.0137C7.3767 13.0137 6.9247 12.5667 6.9247 12.0137C6.9247 11.4607 7.3677 11.0137 7.9207 11.0137H7.9297Z"
                              fill="#919191"
                            />
                          </svg>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem
                          onClick={() => handleEditDependent(dependent.id)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </Scroller>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <MedEmptyBoxIcon />
            <p className="text-sm text-muted-foreground mt-4">
              No dependents found for this user
            </p>
            <Button
              onClick={handleAddDependent}
              className="mt-4"
              variant="outline"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Dependent
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
