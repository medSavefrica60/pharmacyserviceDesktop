import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  renderInput?: (
    props: React.InputHTMLAttributes<HTMLInputElement>
  ) => React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  description,
  wrapperClassName,
  inputClassName,
  labelClassName,
  renderInput,
  ...props
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
          {renderInput ? (
            renderInput({
              ...field,
              ...props,
              id: name,
              className: cn("h-10", inputClassName),
            })
          ) : (
            <Input
              {...field}
              {...props}
              id={name}
              className={cn(
                "h-10",
                inputClassName,
                fieldState.invalid && "border-destructive"
              )}
            />
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </div>
      )}
    />
  );
};
