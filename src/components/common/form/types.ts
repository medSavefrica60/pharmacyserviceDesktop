import { ForwardRefExoticComponent } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: React.ReactNode;
  type?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
  formDescription?: string;
}
export interface FormOtpInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: React.ReactNode;
  id?: string;
  maxLength: number;
  formDescription?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;

  otpGroupClassname?: string;
  otpSlotClassname?: string;
}

export interface FormOtpInputMaskProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: React.ReactNode;
  digits?: number;
  placeholderChar?: string;
  showMaskOnHover?: boolean;
  formDescription?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
  placeholder?: string;
  onOtpChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  rightElement?: React.ReactNode;
}
export interface FormTextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
}
export interface FormRadioGroupProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  id?: string;
  className?: string;
  radios?: Array<{ label: string; value: string }>;
  orientation?: "horizontal" | "vertical" | undefined;
}
export interface FormSelectSearch<T extends FieldValues> {
  name: FieldPath<T>;
  label: React.ReactNode;
  type?: string;
  id?: string;
  selectLabel?: string;
  placeholder?: string;
  EmptyIndicator?: ForwardRefExoticComponent<any>;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
  description?: string;
  data: { label: string; value: string | number }[];
}

export interface ComboboxOption {
  name: string;
  email?: string;
  avatar?: string;
  status?: string;
  [key: string]: any;
}

export interface FormComboboxProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: ComboboxOption[];
  disabled?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
  popoverClassName?: string;
  displayValue?: (option: ComboboxOption) => string;
  displayAvatar?: boolean;
  displayEmail?: boolean;
}

export interface ComboboxSearchOption {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  status?: "active" | "inactive" | string;
  [key: string]: any;
}

export interface FormComboboxSearchProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  emptyText?: string;
  options: ComboboxSearchOption[];
  disabled?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  displayAvatar?: boolean;
  displayEmail?: boolean;
  displayStatus?: boolean;
  idExpr: string;
  displayValue?: (option: ComboboxSearchOption) => string;
  onSelect?: (option: ComboboxSearchOption) => void;
  filterOptions?: (
    options: ComboboxSearchOption[],
    searchValue: string
  ) => ComboboxSearchOption[];
}
