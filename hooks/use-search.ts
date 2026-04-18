"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { staticProducts, type Product } from "@/lib/products";

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }, []);

  // Perform search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lower = debouncedQuery.toLowerCase();
    const filtered = staticProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
    setResults(filtered);
    setIsSearching(false);
  }, [debouncedQuery]);

  return {
    query,
    results,
    search,
    clearSearch,
    isSearching,
    isOpen,
    setIsOpen,
  };
}