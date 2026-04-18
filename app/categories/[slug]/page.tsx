import { getProductsByCategory, getCategories, type CategorySlug } from "@/lib/products";
import CategoryPage from "./category-page-wrapper";

/* ── Static params for static export ── */
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

/* ── Category Metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
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
export default async function CategoryPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug as CategorySlug);
  
  return <CategoryPage slug={slug as CategorySlug} products={products} />;
}