import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormCheckboxProps {
  name: string;
  label?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  description?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  wrapperClassName,
  labelClassName,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <div className={cn("flex items-center space-x-2", wrapperClassName)}>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
            />
            {label && (
              <Label
                htmlFor={name}
                className={cn("text-sm font-normal", labelClassName)}
              >
                {label}
              </Label>
            )}
          </div>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </>
      )}
    />
  );
};
