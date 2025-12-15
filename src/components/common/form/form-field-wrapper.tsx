import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldWrapperProps {
  label: string;
  description: string;
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export default function FormFieldWrapper({
  label,
  description,
  children,
  isLoading = false,
  className,
}: FormFieldWrapperProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <span className="flex flex-col space-y-1">
        <p className="text-sm font-medium text-medsave-black-500">{label}</p>
        <p className="text-sm text-medsave-black-300">{description}</p>
      </span>
      <div className="w-1/2">
        {isLoading ? <Skeleton className="h-15 w-full" /> : children}
      </div>
    </div>
  );
}
