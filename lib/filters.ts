import { Product } from "./products";

export type FilterState = {
  priceMin?: number;
  priceMax?: number;
  sizes?: string[];
  categories?: string[];
  sortBy?: "featured" | "price-asc" | "price-desc";
};

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products];

  if (filters.priceMin !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.priceMax!);
  }
  if (filters.sizes?.length) {
    filtered = filtered.filter((p) =>
      p.sizes?.some((s) => filters.sizes!.includes(s))
    );
  }
  if (filters.categories?.length) {
    filtered = filtered.filter((p) =>
      filters.categories!.includes(p.category)
    );
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  return filtered;
}

// Get unique sizes from products
export function getUniqueSizes(products: Product[]): string[] {
  const sizes = new Set<string>();
  products.forEach((p) => {
    p.sizes?.forEach((s) => sizes.add(s));
  });
  return Array.from(sizes).sort();
}

// Get unique categories from products
export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set<string>();
  products.forEach((p) => {
    categories.add(p.category);
  });
  return Array.from(categories).sort();
}

// Get price range from products
export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}