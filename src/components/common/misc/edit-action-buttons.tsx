"use client";

import { OutlineButton, PrimaryButton } from "./buttons";

type EditActionButtonsProps = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  primaryProps?: Partial<React.ComponentProps<typeof PrimaryButton>>;
  outlineProps?: Partial<React.ComponentProps<typeof OutlineButton>>;
  isSaving?: boolean;
};

export function EditActionButtons({
  isEditing,
  setIsEditing,
  primaryProps,
  outlineProps,
  isSaving = false,
}: EditActionButtonsProps) {
  if (isEditing) {
    return (
      <span className="flex items-center space-x-1.5">
        <PrimaryButton
          isLoading={isSaving}
          type="submit"
          text="Save"
          {...primaryProps}
        />
        <OutlineButton
          type="button"
          text="Cancel"
          onClick={() => setIsEditing(false)}
          {...outlineProps}
        />
      </span>
    );
  }

  return (
    <OutlineButton
      type="button"
      text="Edit"
      onClick={() => setIsEditing(true)}
    />
  );
}
