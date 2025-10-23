import React from "react";
import { ClaimsSearchOption } from "./claims-search";
import { Calendar, X, Building2, Mail, FileCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommandItem } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InputSearch } from "@/components/common/input-search";

export interface ClaimFiltersProps {
  providerOptions: ClaimsSearchOption[];
  status: string;
  dateRangeDisplay: {
    from?: Date;
    to?: Date;
  };
  onProviderSelect: (provider: ClaimsSearchOption) => void;
  onProviderClear: () => void;
  onStatusChange: (status: ClaimStatus) => void;
  onDateRangeChange: (range: { from?: Date; to?: Date } | undefined) => void;
  onClearFilters: () => void;
}

export type ClaimStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export const ClaimFilters: React.FC<ClaimFiltersProps> = ({
  providerOptions,
  status,
  dateRangeDisplay,
  onProviderSelect,
  onProviderClear,
  onStatusChange,
  onDateRangeChange,
  onClearFilters,
}) => {
  return (
    <>
      {/* Provider Search */}
      <div className="px-6 pb-4">
        <InputSearch
          options={providerOptions}
          placeholder="Search providers by name or license number..."
          emptyText="No providers found."
          onSelect={onProviderSelect}
          onClear={onProviderClear}
          renderOption={(option, onSelect) => (
            <CommandItem
              key={option.id}
              onSelect={() => onSelect(option)}
              className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer aria-selected:bg-accent/50 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={option.avatar} alt={option.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {option.name}
                    </p>
                    {option.status && (
                      <Badge
                        variant={
                          option.status === "ACTIVE" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {option.status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {option.email && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{option.email}</span>
                      </div>
                    )}
                    {option.licenseNumber && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileCheck className="h-3 w-3" />
                        <span className="font-mono">
                          {option.licenseNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CommandItem>
          )}
          renderSelected={(option, onClear) => (
            <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-2">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src={option.avatar} alt={option.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {option.name}
                  </p>
                  {option.status && (
                    <Badge
                      variant={
                        option.status === "ACTIVE" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {option.status}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  {option.email && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{option.email}</span>
                    </div>
                  )}
                  {option.licenseNumber && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileCheck className="h-3 w-3" />
                      <span className="font-mono">{option.licenseNumber}</span>
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
          )}
        />
      </div>

      {/* Filters */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Filter by status"
                defaultValue="approved"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !dateRangeDisplay.from &&
                    !dateRangeDisplay.to &&
                    "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateRangeDisplay.from && dateRangeDisplay.to ? (
                  <>
                    {format(dateRangeDisplay.from, "LLL dd, y")} -{" "}
                    {format(dateRangeDisplay.to, "LLL dd, y")}
                  </>
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={{
                  from: dateRangeDisplay.from,
                  to: dateRangeDisplay.to,
                }}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {status !== "all" && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="h-10 px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
