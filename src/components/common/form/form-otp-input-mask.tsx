"use client";

import { useId } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { withMask } from "use-mask-input";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormOtpInputMaskProps } from "@/components/common/form/types";

export function FormOtpInputMask<T extends FieldValues>(
  props: FormOtpInputMaskProps<T>
) {
  const { control } = useFormContext();
  const id = useId();

  const {
    name,
    label = "Enter OTP",
    digits = 6,
    placeholderChar = "_",
    showMaskOnHover = false,
    formDescription,
    disabled,
    readonly,
    className,
    formItemClassname,
    placeholder,
    onOtpChange,
    onComplete,
    rightElement,
  } = props;

  // Generate mask pattern based on number of digits
  const maskPattern = "9".repeat(digits);

  // Generate placeholder based on number of digits
  const defaultPlaceholder = placeholderChar.repeat(digits);

  return (
    <FormField
      control={control}
      disabled={disabled}
      name={name}
      render={({ field }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value.replace(/\D/g, ""); // Remove non-digits

          // Update form field
          field.onChange(value);

          // Call custom OTP change handler
          onOtpChange?.(value);

          // Call completion handler if OTP is complete
          if (value.length === digits) {
            onComplete?.(value);
          }
        };

        return (
          <FormItem className={formItemClassname}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl className="placeholder-medsave-black-100">
              <div className="relative">
                <Input
                  {...field}
                  id={id}
                  ref={withMask(maskPattern, {
                    placeholder: placeholderChar,
                    showMaskOnHover,
                    inputType: "number",
                  })}
                  type="text"
                  inputMode="numeric"
                  placeholder={placeholder || defaultPlaceholder}
                  maxLength={digits}
                  disabled={disabled}
                  readOnly={readonly}
                  className={cn(
                    "text-center text-lg font-mono tracking-widest",
                    rightElement ? "pr-20" : "pr-4", // Add right padding when element exists
                    className
                  )}
                  onChange={handleChange}
                />
                {rightElement && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
                    {rightElement}
                  </div>
                )}
              </div>
            </FormControl>
            {formDescription && (
              <FormDescription>
                {formDescription || `Enter ${digits}-digit verification code`}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export { type FormOtpInputMaskProps };
