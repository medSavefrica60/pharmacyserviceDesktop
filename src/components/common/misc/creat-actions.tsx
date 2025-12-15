import { OutlineButton, PrimaryButton } from "./buttons";

type CreateActionButtonsProps = {
  primaryProps?: Partial<React.ComponentProps<typeof PrimaryButton>>;
  outlineProps?: Partial<React.ComponentProps<typeof OutlineButton>>;
  isSaving?: boolean;
};

export function CreateActionButtons({
  primaryProps,
  isSaving = false,
}: CreateActionButtonsProps) {
  return (
    <PrimaryButton
      isLoading={isSaving}
      type="submit"
      text="Save"
      className=""
      size="lg"
      {...primaryProps}
    />
  );
}
