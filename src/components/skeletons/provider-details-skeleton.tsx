import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const ProviderDetailsSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Skeleton: Provider Avatar and Name */}
      <div className="flex flex-col items-center gap-3 px-6 py-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      {/* Skeleton: Tabs */}
      <div className="mx-6 mb-4">
        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-md">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      </div>

      {/* Skeleton: Content */}
      <div className="px-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}

        <Separator className="my-6" />

        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
};
