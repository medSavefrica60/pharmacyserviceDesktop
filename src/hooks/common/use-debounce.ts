"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => setDebouncedValue(value), delay);
  }, [value, delay]);

  return debouncedValue;
};
