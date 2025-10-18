"use client";

import { useState, useId } from "react";
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

// Types
export interface SearchOption {
  id: string;
  name: string;
  email?: string;
  memberId?: string;
  avatar?: string;
  status?: string;
}

export interface StatementsSearchProps {
  options: SearchOption[];
  placeholder?: string;
  emptyText?: string;
  disabled?: boolean;
  displayValue?: (option: SearchOption) => string;
  onSelect?: (option: SearchOption) => void;
  onClear?: () => void;
  filterOptions?: (options: SearchOption[], search: string) => SearchOption[];
  className?: string;
}

// Selected Option Display Component
interface SelectedOptionDisplayProps {
  option: SearchOption;
  displayValue?: (option: SearchOption) => string;
  onClear: () => void;
  disabled?: boolean;
}

function SelectedOptionDisplay({
  option,
  displayValue,
  onClear,
  disabled,
}: SelectedOptionDisplayProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-1.5">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">
            {displayValue ? displayValue(option) : option.name}
          </p>
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

// Search Option Item Component
interface SearchOptionItemProps {
  option: SearchOption;
  displayValue?: (option: SearchOption) => string;
  onSelect: (option: SearchOption) => void;
}

function SearchOptionItem({
  option,
  displayValue,
  onSelect,
}: SearchOptionItemProps) {
  return (
    <CommandItem
      key={option.id}
      onSelect={() => {
        onSelect(option);
      }}
      className="flex items-center gap-3 px-3 py-1.5 rounded-md cursor-pointer aria-selected:bg-accent/50 hover:bg-accent/30 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">
            {displayValue ? displayValue(option) : option.name}
          </p>
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

// Search Dropdown Component
interface SearchDropdownProps {
  id: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filteredOptions: SearchOption[];
  placeholder: string;
  emptyText: string;
  disabled?: boolean;
  displayValue?: (option: SearchOption) => string;
  onSelectOption: (option: SearchOption) => void;
}

function SearchDropdown({
  id,
  searchValue,
  onSearchChange,
  filteredOptions,
  placeholder,
  emptyText,
  disabled,
  displayValue,
  onSelectOption,
}: SearchDropdownProps) {
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
                  {filteredOptions.map((option) => (
                    <SearchOptionItem
                      key={option.id}
                      option={option}
                      displayValue={displayValue}
                      onSelect={onSelectOption}
                    />
                  ))}
                </CommandGroup>
              </CommandList>
            </div>
          </div>
        )}
      </Command>
    </div>
  );
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
}: StatementsSearchProps) {
  const id = useId();
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<SearchOption | null>(
    null
  );

  const defaultFilterOptions = (opts: SearchOption[], search: string) => {
    return opts.filter(
      (option) =>
        option.name
          .trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase()) ||
        option.email
          ?.trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase()) ||
        option.memberId
          ?.trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase())
    );
  };

  const filteredOptions = filterOptions
    ? filterOptions(options, searchValue)
    : defaultFilterOptions(options, searchValue);

  const handleSelectOption = (option: SearchOption) => {
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
        <SelectedOptionDisplay
          option={selectedOption}
          displayValue={displayValue}
          onClear={handleClearOption}
          disabled={disabled}
        />
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
        />
      )}
    </div>
  );
}
