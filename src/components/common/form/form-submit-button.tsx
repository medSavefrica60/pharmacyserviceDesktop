"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface FormSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loadingText?: string;
  isLoading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
}

/**
 * Submit button component that uses Next.js useFormStatus hook
 * This should be used inside a form with a form action
 */
export const FormSubmitButton = forwardRef<
  HTMLButtonElement,
  FormSubmitButtonProps
>(
  (
    {
      children,
      loadingText = "Submitting...",
      variant = "default",
      size = "default",
      className,
      disabled,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <Button
        ref={ref}
        type="submit"
        variant={variant}
        size={size}
        disabled={disabled || pending || isLoading}
        className={cn(
          "transition-colors disabled:opacity-80 disabled:cursor-not-allowed",
          "w-full h-15 bg-medsave-blue-500 text-background font-semibold rounded-md hover:bg-medsave-blue-600",
          className
        )}
        {...props}
      >
        {pending || isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    );
  }
);

FormSubmitButton.displayName = "FormSubmitButton";
