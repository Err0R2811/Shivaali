import { getProductsByCategory, categories, type CategorySlug } from "@/lib/products";
import CategoryPageContent from "./category-content";

/* ── Static params for static export ── */
export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

/* ── Category Metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return { title: "Category Not Found" };
  }
  
  return {
    title: `${category.name} | Ethnic Store`,
    description: `Shop our collection of ${category.name.toLowerCase()} - ${category.count} ${category.sub}`,
  };
}

/* ── Main Page Component ── */
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = getProductsByCategory(slug as CategorySlug);
  
  return <CategoryPageContent slug={slug as CategorySlug} products={products} />;
}