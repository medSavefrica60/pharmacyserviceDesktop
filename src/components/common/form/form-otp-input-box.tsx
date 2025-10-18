import { FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormOtpInputProps } from "@/components/common/form/types";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useId } from "react";

export default function FormOtpInputBox<T extends FieldValues>(
  props: FormOtpInputProps<T>
) {
  const { control } = useFormContext();
  const id = useId();

  if (!props.maxLength || props.maxLength < 1) {
    throw new Error("maxLength prop is required and should be greater than 0");
  }
  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.formItemClassname}>
          <FormLabel className="">{props.label}</FormLabel>
          <FormControl className="placeholder-zinc-500">
            <InputOTP maxLength={props.maxLength} {...field}>
              <InputOTPGroup
                id={id}
                className={`${props.otpGroupClassname} space-x-5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border`}
              >
                {Array.from({ length: props.maxLength }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={`size-15 ${props.otpSlotClassname} `}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {props.formDescription && (
            <FormDescription>{props.formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
