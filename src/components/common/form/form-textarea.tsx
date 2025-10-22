import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  description?: string;
  wrapperClassName?: string;
  textareaClassName?: string;
  labelClassName?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  description,
  wrapperClassName,
  textareaClassName,
  labelClassName,
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
          <Textarea
            {...field}
            {...props}
            id={name}
            className={cn(
              textareaClassName,
              fieldState.invalid && "border-destructive"
            )}
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
