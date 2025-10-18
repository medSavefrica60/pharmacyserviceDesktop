"use client";
import { FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cx } from "class-variance-authority";
import { FormInputProps } from "./types";

export default function FormPasswordInput<T extends FieldValues>(
  props: FormInputProps<T>
) {
  const { control } = useFormContext();
  const [visible, setVisible] = useState(false);

  const Visibility = useMemo(() => {
    if (visible) {
      return (
        <>
          <EyeOff
            className="h-5 w-5 text-neutral-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setVisible(false)}
          />
          <span className="sr-only">Hide password</span>
        </>
      );
    }
    return (
      <>
        <Eye
          className="h-5 w-5 text-neutral-600 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setVisible(true)}
        />
        <span className="sr-only">Show password</span>
      </>
    );
  }, [visible]);

  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cx(``, props.formItemClassname)}>
          <FormLabel className="">{props.label}</FormLabel>
          <FormControl className="placeholder-zinc-500">
            <div className="relative">
              <Input
                className={cn("rounded-md", props.className || "")}
                {...props}
                {...field}
                type={visible ? "text" : "password"}
              />
              {Visibility}
            </div>
          </FormControl>
          {props.formDescription && (
            <FormDescription className="text-xs text-muted-foreground">
              {props.formDescription}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
