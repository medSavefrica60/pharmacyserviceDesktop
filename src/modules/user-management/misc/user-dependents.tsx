import { Scroller } from "@/components/ui/scroller";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MedEmptyBoxIcon } from "@/components/common/icons";
import { useGetDependents } from "@/hooks/api/use-dependents";
import { Dependent } from "@/types";

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

export const UserDependents = ({ userId, isLoading: parentLoading }: UserDependentsProps) => {
  const { data: dependentsData, isLoading: dependentsLoading } = useGetDependents({
    userId,
  });

  const isLoading = parentLoading || dependentsLoading;
  const dependents = dependentsData?.dependents || [];

  return (
    <div>
      <header className="flex items-center flex-1 justify-between px-4 py-3 border border-b-0">
        <h1 className="font-bold text-xl text-medsave-black-500">
          Dependents
        </h1>
      </header>
      <section className="p-4 border">
        <Scroller className="h-[calc(100vh-600px)]">
          <div className="flex flex-col gap-2.5 pr-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
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
              ))
            ) : dependents.length > 0 ? (
              dependents.map((dependent: Dependent) => (
                <div
                  key={dependent.id}
                  className="rounded-md border bg-accent"
                >
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
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <MedEmptyBoxIcon />
                <p className="text-sm text-muted-foreground mt-4">
                  No dependents found for this user
                </p>
              </div>
            )}
          </div>
        </Scroller>
      </section>
    </div>
  );
};

