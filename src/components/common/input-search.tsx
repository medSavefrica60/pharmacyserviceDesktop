import { useState, useId, ReactNode } from "react";
import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Generic search option interface
export interface SearchOption {
  id: string;
  name: string;
  [key: string]: any; // Allow additional properties
}

// Props for the InputSearch component
export interface InputSearchProps<T extends SearchOption> {
  options: T[];
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  onSelect?: (option: T) => void;
  onClear?: () => void;
  filterOptions?: (options: T[], search: string) => T[];
  className?: string;
  renderSelected?: (option: T, onClear: () => void) => ReactNode;
  renderOption?: (option: T, onSelect: (option: T) => void) => ReactNode;
  displayValue?: (option: T) => string;
}

// Default selected option display component
interface DefaultSelectedDisplayProps<T extends SearchOption> {
  option: T;
  displayValue?: (option: T) => string;
  onClear: () => void;
  disabled?: boolean;
}

function DefaultSelectedDisplay<T extends SearchOption>({
  option,
  displayValue,
  onClear,
  disabled,
}: DefaultSelectedDisplayProps<T>) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-1.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">
            {displayValue ? displayValue(option) : option.name}
          </p>
          {option.licenseNumber && (
            <span className="text-xs text-muted-foreground">
              • {option.licenseNumber}
            </span>
          )}
          {option.memberId && (
            <span className="text-xs text-muted-foreground">
              • {option.memberId}
            </span>
          )}
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
        onClick={onClear}
        disabled={disabled}
      >
        <X className="size-4" />
        <span className="sr-only">Remove selection</span>
      </Button>
    </div>
  );
}

// Default search option item component
interface DefaultOptionItemProps<T extends SearchOption> {
  option: T;
  displayValue?: (option: T) => string;
  onSelect: (option: T) => void;
}

function DefaultOptionItem<T extends SearchOption>({
  option,
  displayValue,
  onSelect,
}: DefaultOptionItemProps<T>) {
  return (
    <CommandItem
      key={option.id}
      onSelect={() => onSelect(option)}
      className="flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer aria-selected:bg-accent/50 hover:bg-accent/30 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">
            {displayValue ? displayValue(option) : option.name}
          </p>
          {option.licenseNumber && (
            <span className="text-xs text-muted-foreground">
              • {option.licenseNumber}
            </span>
          )}
          {option.memberId && (
            <span className="text-xs text-muted-foreground">
              • {option.memberId}
            </span>
          )}
        </div>
      </div>
    </CommandItem>
  );
}

// Search dropdown component
interface SearchDropdownProps<T extends SearchOption> {
  id: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filteredOptions: T[];
  placeholder: string;
  emptyText: string;
  disabled?: boolean;
  displayValue?: (option: T) => string;
  onSelectOption: (option: T) => void;
  renderOption?: (option: T, onSelect: (option: T) => void) => ReactNode;
}

function SearchDropdown<T extends SearchOption>({
  id,
  searchValue,
  onSearchChange,
  filteredOptions,
  placeholder,
  emptyText,
  disabled,
  displayValue,
  onSelectOption,
  renderOption,
}: SearchDropdownProps<T>) {
  return (
    <div className="relative">
      <Command className="rounded-lg border border-border bg-card">
        <CommandInput
          id={id}
          placeholder={placeholder}
          value={searchValue}
          onValueChange={onSearchChange}
          disabled={disabled}
        />
        {searchValue && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <div className="rounded-lg border border-border bg-card">
              <CommandList className="max-h-[320px] overflow-y-auto p-2">
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  {emptyText}
                </CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((option) =>
                    renderOption ? (
                      <div key={option.id}>
                        {renderOption(option, onSelectOption)}
                      </div>
                    ) : (
                      <DefaultOptionItem
                        key={option.id}
                        option={option}
                        displayValue={displayValue}
                        onSelect={onSelectOption}
                      />
                    )
                  )}
                </CommandGroup>
              </CommandList>
            </div>
          </div>
        )}
      </Command>
    </div>
  );
}

// Main InputSearch component
export function InputSearch<T extends SearchOption>({
  options,
  placeholder = "Search...",
  emptyText = "No results found.",
  disabled = false,
  displayValue,
  filterOptions,
  onSelect,
  onClear,
  className,
  renderSelected,
  renderOption,
}: InputSearchProps<T>) {
  const id = useId();
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const defaultFilterOptions = (opts: T[], search: string) => {
    return opts.filter((option) => {
      const searchLower = search.trim().toLowerCase();
      return (
        option.name?.trim().toLowerCase().includes(searchLower) ||
        option.email?.trim().toLowerCase().includes(searchLower) ||
        option.licenseNumber?.trim().toLowerCase().includes(searchLower) ||
        option.memberId?.trim().toLowerCase().includes(searchLower) ||
        Object.values(option).some(
          (value) =>
            typeof value === "string" &&
            value.trim().toLowerCase().includes(searchLower)
        )
      );
    });
  };

  const filteredOptions = filterOptions
    ? filterOptions(options, searchValue)
    : defaultFilterOptions(options, searchValue);

  const handleSelectOption = (option: T) => {
    setSelectedOption(option);
    setSearchValue("");
    onSelect?.(option);
  };

  const handleClearOption = () => {
    setSelectedOption(null);
    setSearchValue("");
    onClear?.();
  };

  return (
    <div className={cn("w-full max-w-2xl space-y-4 relative", className)}>
      {selectedOption ? (
        renderSelected ? (
          renderSelected(selectedOption, handleClearOption)
        ) : (
          <DefaultSelectedDisplay
            option={selectedOption}
            displayValue={displayValue}
            onClear={handleClearOption}
            disabled={disabled}
          />
        )
      ) : (
        <SearchDropdown
          id={id}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filteredOptions={filteredOptions}
          placeholder={placeholder}
          emptyText={emptyText}
          disabled={disabled}
          displayValue={displayValue}
          onSelectOption={handleSelectOption}
          renderOption={renderOption}
        />
      )}
    </div>
  );
}
