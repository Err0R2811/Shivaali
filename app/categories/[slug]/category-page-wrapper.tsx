"use client";

import { Suspense } from "react";
import CategoryPageWithFilters from "./category-page";
import { type Product, type CategorySlug } from "@/lib/products";

interface CategoryPageWrapperProps {
  slug: CategorySlug;
  products: Product[];
}

function CategoryPageWithFiltersWrapper({ slug, products }: CategoryPageWrapperProps) {
  return <CategoryPageWithFilters slug={slug} products={products} />;
}

export default function CategoryPage({ slug, products }: CategoryPageWrapperProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CategoryPageWithFiltersWrapper slug={slug} products={products} />
    </Suspense>
  );
}