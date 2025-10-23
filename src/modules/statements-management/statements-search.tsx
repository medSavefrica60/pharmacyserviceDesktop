import { InputSearch, SearchOption } from "@/components/common/input-search";
import { ReactNode } from "react";
import { User } from "@/types";

// User search option interface (extends User with SearchOption requirements)
export interface UserSearchOption extends User, SearchOption {
  name: string; // Computed from firstName + lastName
}

// Helper function to transform User to UserSearchOption
export const transformUserToSearchOption = (user: User): UserSearchOption => ({
  ...user,
  name: `${user.firstName} ${user.lastName}`.trim(),
});

export interface StatementsSearchProps {
  options: UserSearchOption[];
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  displayValue?: (option: UserSearchOption) => string;
  onSelect?: (option: UserSearchOption) => void;
  onClear?: () => void;
  filterOptions?: (
    options: UserSearchOption[],
    search: string
  ) => UserSearchOption[];
  className?: string;
  renderOption?: (
    option: UserSearchOption,
    onSelect: (option: UserSearchOption) => void
  ) => ReactNode;
  renderSelected?: (option: UserSearchOption, onClear: () => void) => ReactNode;
}

export function StatementsSearch({
  options,
  placeholder = "Search users by name or member ID...",
  emptyText = "No users found.",
  disabled = false,
  displayValue,
  filterOptions,
  onSelect,
  onClear,
  className,
  renderOption,
  renderSelected,
}: StatementsSearchProps) {
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
