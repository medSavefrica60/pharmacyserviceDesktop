"use client";

import { useState, useId } from "react";
import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { ComboboxSearchOption, FormComboboxSearchProps } from "./types";

// Avatar Component
interface OptionAvatarProps {
  option: ComboboxSearchOption;
  size?: "sm" | "md";
}

function OptionAvatar({ option, size = "md" }: OptionAvatarProps) {
  const avatarSize = size === "sm" ? "size-6" : "size-9";
  const ringClass = size === "md" ? "ring-1 ring-border/50" : "";

  return (
    <Avatar className={cn(avatarSize, ringClass)}>
      <AvatarImage
        src={option.avatar || "/placeholder.svg"}
        alt={option.name}
      />
      <AvatarFallback className="text-xs bg-muted">
        {option.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}

// Selected Option Display Component
interface SelectedOptionDisplayProps {
  option: ComboboxSearchOption;
  idExpr: string;
  displayAvatar: boolean;
  displayEmail: boolean;
  displayValue?: (option: ComboboxSearchOption) => string;
  onClear: () => void;
  disabled?: boolean;
  hasError?: boolean;
}

function SelectedOptionDisplay({
  option,
  displayAvatar,
  displayEmail,
  displayValue,
  onClear,
  disabled,
  hasError,
}: SelectedOptionDisplayProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-card p-2",
        hasError && "border-destructive"
      )}
    >
      {displayAvatar && <OptionAvatar option={option} size="md" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight">
          {displayValue ? displayValue(option) : option.name}
        </p>
        {displayEmail && option.email && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {option.email}
          </p>
        )}
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
  option: ComboboxSearchOption;
  idExpr: string;
  displayAvatar: boolean;
  displayEmail: boolean;
  displayStatus: boolean;
  displayValue?: (option: ComboboxSearchOption) => string;
  onSelect: (option: ComboboxSearchOption) => void;
}

function SearchOptionItem({
  option,
  displayAvatar,
  displayEmail,
  displayStatus,
  displayValue,
  onSelect,
  idExpr,
}: SearchOptionItemProps) {
  return (
    <CommandItem
      key={option[idExpr]}
      onSelect={() => {
        onSelect(option);
      }}
      className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer aria-selected:bg-accent/50 hover:bg-accent/30 transition-colors"
    >
      {displayAvatar && <OptionAvatar option={option} size="md" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight">
          {displayValue ? displayValue(option) : option.name}
        </p>
        {displayEmail && option.email && (
          <p className="text-xs text-muted-foreground truncate mt-1">
            {option.email}
          </p>
        )}
      </div>
      {displayStatus && option.status && (
        <Badge
          variant={option.status === "active" ? "default" : "secondary"}
          className="shrink-0 text-xs px-2 py-0.5"
        >
          {option.status}
        </Badge>
      )}
    </CommandItem>
  );
}

// Search Dropdown Component
interface SearchDropdownProps {
  id: string;
  idExpr: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filteredOptions: ComboboxSearchOption[];
  placeholder: string;
  emptyText: string;
  disabled?: boolean;
  hasError?: boolean;
  displayAvatar: boolean;
  displayEmail: boolean;
  displayStatus: boolean;
  displayValue?: (option: ComboboxSearchOption) => string;
  onSelectOption: (option: ComboboxSearchOption) => void;
}

function SearchDropdown({
  id,
  idExpr,
  searchValue,
  onSearchChange,
  filteredOptions,
  placeholder,
  emptyText,
  disabled,
  hasError,
  displayAvatar,
  displayEmail,
  displayStatus,
  displayValue,
  onSelectOption,
}: SearchDropdownProps) {
  return (
    <div className="relative">
      <Command
        className={cn(
          "rounded-lg border border-border bg-card",
          hasError && "border-destructive"
        )}
      >
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
                      key={option[idExpr]}
                      idExpr={idExpr}
                      option={option}
                      displayAvatar={displayAvatar}
                      displayEmail={displayEmail}
                      displayStatus={displayStatus}
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

export function FormComboboxSearch<T extends FieldValues>({
  name,
  label,
  placeholder = "Search users by name or email...",
  emptyText = "No users found.",
  options,
  disabled = false,
  wrapperClassName,
  labelClassName,
  displayAvatar = true,
  displayEmail = true,
  displayStatus = false,
  displayValue,
  filterOptions,
  onSelect,
  idExpr,
}: FormComboboxSearchProps<T>) {
  const id = useId();
  const { control } = useFormContext<T>();
  const [searchValue, setSearchValue] = useState("");

  const defaultFilterOptions = (
    opts: ComboboxSearchOption[],
    search: string
  ) => {
    return opts.filter(
      (option) =>
        option.name
          .trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase()) ||
        option.email?.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
  };

  const filteredOptions = filterOptions
    ? filterOptions(options, searchValue)
    : defaultFilterOptions(options, searchValue);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedOption = options.find(
          (option) => option[idExpr] === field.value
        );

        const handleSelectOption = (option: ComboboxSearchOption) => {
          field.onChange(option[idExpr]);
          onSelect?.(option);
          setSearchValue("");
        };

        const handleClearOption = () => {
          field.onChange("");
          setSearchValue("");
        };

        return (
          <div className={cn("w-full space-y-2", wrapperClassName)}>
            {label && (
              <Label htmlFor={id} className={labelClassName}>
                {label}
              </Label>
            )}
            <div className="w-full max-w-2xl space-y-4 relative">
              {selectedOption ? (
                <SelectedOptionDisplay
                  option={selectedOption}
                  displayAvatar={displayAvatar}
                  displayEmail={displayEmail}
                  displayValue={displayValue}
                  onClear={handleClearOption}
                  disabled={disabled}
                  hasError={fieldState.invalid}
                  idExpr={idExpr}
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
                  hasError={fieldState.invalid}
                  displayAvatar={displayAvatar}
                  displayEmail={displayEmail}
                  displayStatus={displayStatus}
                  displayValue={displayValue}
                  onSelectOption={handleSelectOption}
                  idExpr={idExpr}
                />
              )}
            </div>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </div>
        );
      }}
    />
  );
}
