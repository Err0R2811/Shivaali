"use client";

import { useState, useEffect, useCallback } from "react";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { staticProducts, type Product } from "@/lib/products";
import {
  type FilterState,
  filterProducts,
  getUniqueSizes,
  getUniqueCategories,
  getPriceRange,
} from "@/lib/filters";

interface FilterSidebarProps {
  onFilterChange?: (filteredProducts: Product[]) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [filters, setFilters] = useState<FilterState>({
    priceMin: searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : undefined,
    priceMax: searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : undefined,
    sizes: searchParams.get("sizes")?.split(",").filter(Boolean) || [],
    categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
    sortBy: (searchParams.get("sortBy") as FilterState["sortBy"]) || "featured",
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);

  const sizes = getUniqueSizes(staticProducts);
  const categories = getUniqueCategories(staticProducts);
  const priceRange = getPriceRange(staticProducts);

  // Apply filters and update URL
  const applyFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);

      // Update URL
      const params = new URLSearchParams();
      if (newFilters.priceMin) params.set("priceMin", String(newFilters.priceMin));
      if (newFilters.priceMax) params.set("priceMax", String(newFilters.priceMax));
      if (newFilters.sizes?.length) params.set("sizes", newFilters.sizes.join(","));
      if (newFilters.categories?.length)
        params.set("categories", newFilters.categories.join(","));
      if (newFilters.sortBy && newFilters.sortBy !== "featured")
        params.set("sortBy", newFilters.sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.push(newUrl, { scroll: false });

      // Apply filter to products
      const filtered = filterProducts(staticProducts, newFilters);
      onFilterChange?.(filtered);
    },
    [router, onFilterChange]
  );

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...(filters.sizes || []), size]
      : (filters.sizes || []).filter((s) => s !== size);
    applyFilters({ ...filters, sizes: newSizes });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...(filters.categories || []), category]
      : (filters.categories || []).filter((c) => c !== category);
    applyFilters({ ...filters, categories: newCategories });
  };

  const handleSortChange = (sortBy: FilterState["sortBy"]) => {
    applyFilters({ ...filters, sortBy });
  };

  const clearAllFilters = () => {
    applyFilters({ sortBy: "featured" });
  };

  const hasActiveFilters =
    filters.priceMin ||
    filters.priceMax ||
    (filters.sizes && filters.sizes.length > 0) ||
    (filters.categories && filters.categories.length > 0);

  // Filter content component
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold mb-3">Sort By</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {filters.sortBy === "featured"
                ? "Featured"
                : filters.sortBy === "price-asc"
                ? "Price: Low to High"
                : "Price: High to Low"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => handleSortChange("featured")}>
              Featured
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("price-asc")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("price-desc")}>
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin || ""}
            onChange={(e) =>
              applyFilters({
                ...filters,
                priceMin: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax || ""}
            onChange={(e) =>
              applyFilters({
                ...filters,
                priceMax: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Range: ₹{priceRange.min} - ₹{priceRange.max}
        </p>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
        <div className="p-3 bg-muted/50 rounded-lg border border-border/50 text-sm text-foreground font-medium text-center shadow-sm">
          Available in Free Size Only
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer capitalize"
            >
              <Checkbox
                checked={filters.categories?.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearAllFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <Button
        variant="outline"
        className="lg:hidden w-full mb-4"
        onClick={() => setIsMobileOpen(true)}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
            Active
          </span>
        )}
      </Button>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 z-50 lg:hidden max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent />
            <Button className="w-full mt-4" onClick={() => setIsMobileOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </>
      )}

      {/* Desktop Sidebar Toggle & Drawer */}
      <div className="hidden lg:flex relative items-start">
        {!isDesktopOpen && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDesktopOpen(true)}
            className="sticky top-28 ml-2 rounded-full shadow-md z-10 hover:bg-primary/5"
            aria-label="Open Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        )}
        
        <aside
          className={`transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${
            isDesktopOpen ? "w-64 opacity-100 mr-8" : "w-0 opacity-0 mr-0"
          }`}
        >
          <div className="sticky top-24 p-5 bg-background rounded-xl border shadow-sm w-64 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-2 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDesktopOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </aside>
      </div>
    </>
  );
}