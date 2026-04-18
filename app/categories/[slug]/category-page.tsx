"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { staticCategories as categories, type Product, type CategorySlug } from "@/lib/products";
import { filterProducts, type FilterState } from "@/lib/filters";
import { FilterSidebar } from "@/components/filter-sidebar";
import CategoryPageContent from "./category-content";

interface CategoryPageWithFiltersProps {
  slug: CategorySlug;
  products: Product[];
}

export default function CategoryPageWithFilters({ slug, products: initialProducts }: CategoryPageWithFiltersProps) {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  // Initialize filters from URL and apply them
  const filters: FilterState = useMemo(() => ({
    priceMin: searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : undefined,
    priceMax: searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : undefined,
    sizes: searchParams.get("sizes")?.split(",").filter(Boolean) || [],
    categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
    sortBy: (searchParams.get("sortBy") as FilterState["sortBy"]) || "featured",
  }), [searchParams]);

  const handleFilterChange = (newProducts: Product[]) => {
    setFilteredProducts(newProducts);
  };

  // Apply initial filters on mount
  useMemo(() => {
    const filtered = filterProducts(initialProducts, filters);
    setFilteredProducts(filtered);
  }, [initialProducts, filters]);

  return (
    <div className="flex flex-col lg:flex-row">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className="flex-1">
        <CategoryPageContent slug={slug} products={filteredProducts} />
      </div>
    </div>
  );
}