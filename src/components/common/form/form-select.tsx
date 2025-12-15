import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  wrapperClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
  required?: boolean;
  disabled?: boolean;
  options: Array<{ label: string; value: string }>;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  description,
  placeholder,
  wrapperClassName,
  selectClassName,
  labelClassName,
  options,
  disabled,
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
            </Label>
          )}
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={name}
              className={cn(
                "h-[52px]! tracking-wide leading-loose! ",
                selectClassName,
                fieldState.invalid && "border-destructive"
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </div>
      )}
    />
  );
};
