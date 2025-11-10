import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FormFieldSkeletonProps {
  label?: boolean;
  className?: string;
  height?: string;
}

export function FormFieldSkeleton({
  label = true,
  className,
  height = "h-10",
}: FormFieldSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Skeleton className="h-4 w-24" />}
      <Skeleton className={cn(height, "w-full")} />
    </div>
  );
}

