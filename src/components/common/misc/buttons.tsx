import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type buttonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  text?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  loadingIcon?: React.ReactNode;
  loadingPosition?: "left" | "right";
};

export const OutlineButton = ({
  onClick,
  type = "button",
  text = "Edit",
  className,
  size = "sm",
}: buttonProps) => {
  return (
    <Button
      variant={`outline`}
      size={size}
      type={type}
      className={cn(
        "border-medsave-blue-500 px-4 py-2 font-semibold text-medsave-blue-500",
        className
      )}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export const PrimaryButton = ({
  onClick,
  type = "button",
  variant = "default",
  text = "Save",
  className,
  size = "sm",
  isLoading = false,
  loadingText = "saving...",
  loadingIcon = <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />,
  loadingPosition = "left",
  disabled = false,
}: buttonProps) => {
  return (
    <Button
      size={size}
      type={type}
      variant={variant}
      className={cn(
        "px-3 py-2 font-semibold disabled:opacity-70 disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          {loadingPosition === "left" && loadingIcon}
          {loadingText}
          {loadingPosition === "right" && loadingIcon}
        </>
      ) : (
        text
      )}
    </Button>
  );
};
