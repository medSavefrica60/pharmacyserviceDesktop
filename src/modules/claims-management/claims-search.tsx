import { InputSearch, SearchOption } from "@/components/common/input-search";
import { ReactNode } from "react";

// Claims-specific search option interface
export interface ClaimsSearchOption extends SearchOption {
  email?: string;
  licenseNumber?: string;
  status?: string;
  avatar?: string;
}

export interface ClaimsSearchProps {
  options: ClaimsSearchOption[];
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  displayValue?: (option: ClaimsSearchOption) => string;
  onSelect?: (option: ClaimsSearchOption) => void;
  onClear?: () => void;
  filterOptions?: (
    options: ClaimsSearchOption[],
    search: string
  ) => ClaimsSearchOption[];
  className?: string;
  renderOption?: (
    option: ClaimsSearchOption,
    onSelect: (option: ClaimsSearchOption) => void
  ) => ReactNode;
  renderSelected?: (
    option: ClaimsSearchOption,
    onClear: () => void
  ) => ReactNode;
}

export function ClaimsSearch({
  options,
  placeholder = "Search providers by name or license number...",
  emptyText = "No providers found.",
  disabled = false,
  displayValue,
  filterOptions,
  onSelect,
  onClear,
  className,
  renderOption,
  renderSelected,
}: ClaimsSearchProps) {
  return (
    <InputSearch
      options={options}
      placeholder={placeholder}
      emptyText={emptyText}
      disabled={disabled}
      displayValue={displayValue}
      filterOptions={filterOptions}
      onSelect={onSelect}
      onClear={onClear}
      className={className}
      renderOption={renderOption}
      renderSelected={renderSelected}
    />
  );
}
