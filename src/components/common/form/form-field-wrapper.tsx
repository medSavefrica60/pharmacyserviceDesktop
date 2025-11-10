import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface FormFieldWrapperProps {
  label: string;
  description: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function FormFieldWrapper({
  label,
  description,
  children,
  isLoading = false,
}: FormFieldWrapperProps) {
  return (
    <div className="flex items-center justify-between">
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
