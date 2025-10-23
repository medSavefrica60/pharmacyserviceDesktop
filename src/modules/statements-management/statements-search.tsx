import { InputSearch, SearchOption } from "@/components/common/input-search";
import { ReactNode } from "react";
import { User } from "@/types";
import { CommandItem } from "@/components/ui/command";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Mail, Hash, X } from "lucide-react";

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

// Default render option component
const DefaultRenderOption = (
  option: UserSearchOption,
  onSelect: (option: UserSearchOption) => void
) => (
  <CommandItem
    key={option.id}
    onSelect={() => onSelect(option)}
    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer aria-selected:bg-accent/50 hover:bg-accent/30 transition-colors"
  >
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary">
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground truncate">
            {option.name}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          {option.email && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span className="truncate">{option.email}</span>
            </div>
          )}
          {option.ghanaCardNumber && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Hash className="h-3 w-3" />
              <span className="font-mono">{option.ghanaCardNumber}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </CommandItem>
);

// Default render selected component
const DefaultRenderSelected = (
  option: UserSearchOption,
  onClear: () => void
) => (
  <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-2">
    <Avatar className="h-8 w-8 shrink-0">
      <AvatarFallback className="bg-primary/10 text-primary">
        <UserIcon className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground truncate">
          {option.name}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-1">
        {option.email && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{option.email}</span>
          </div>
        )}
        {option.ghanaCardNumber && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span className="font-mono">{option.ghanaCardNumber}</span>
          </div>
        )}
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={onClear}
      className="size-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
    >
      <X className="size-4" />
    </Button>
  </div>
);

// Export the UserSearchOption type for external use

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
