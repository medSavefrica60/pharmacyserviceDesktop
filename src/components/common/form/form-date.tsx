import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { DateInput } from "@/components/common/date/date-input";
import { cn } from "@/lib/utils";

interface FormDateProps {
  name: string;
  label?: string;
  description?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormDate: React.FC<FormDateProps> = ({
  name,
  label,
  description,
  wrapperClassName,
  labelClassName,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", wrapperClassName)}>
          {label && (
            <Label htmlFor={name} className={labelClassName}>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
          <DateInput
            value={field.value ? new Date(field.value) : undefined}
            onChange={(date) => {
              // Format date as YYYY-MM-DD for consistent storage
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              field.onChange(`${year}-${month}-${day}`);
            }}
          />
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </div>
      )}
    />
  );
};
