import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import {
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// formatDateTime
export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// formatCurrency - Formats amount as GHS currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount);
}

// formatAmountForIndicator - Formats amount to 2 decimal places
export function formatAmountForIndicator(amount: number): string {
  return amount.toFixed(2);
}

// formatDate - Formats date in short format (e.g., "Jan 15, 2024")
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// formatTime - Formats time in 12-hour format (e.g., "02:30 PM")
export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// getStatusIcon - Returns icon component for status
export function getStatusIcon(status: string): React.ReactElement {
  switch (status) {
    case "ACTIVE":
      return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
    case "INACTIVE":
      return <XCircleIcon className="h-4 w-4 text-gray-600" />;
    case "SUSPENDED":
      return <AlertCircleIcon className="h-4 w-4 text-orange-600" />;
    default:
      return <AlertCircleIcon className="h-4 w-4 text-gray-600" />;
  }
}

// getStatusColor - Returns Tailwind classes for status badge colors
export function getStatusColor(status: string): string {
  switch (status) {
    case "ACTIVE":
      return "bg-green-50 text-green-600 border-green-200";
    case "INACTIVE":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "SUSPENDED":
      return "bg-orange-50 text-orange-600 border-orange-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];
