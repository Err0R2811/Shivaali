import { getProductBySlug, getRelatedProducts, getAllProducts } from "@/lib/products";
import ProductPageContent from "./product-content";

/* ── Static params for static export ── */
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/* ── Product Metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return { title: "Product Not Found" };
  }
  
  return {
    title: `${product.name} | Ethnic Store`,
    description: product.description,
  };
}

/* ── Main Page Component ── */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Product not found</p>
      </div>
    );
  }
  
  const relatedProducts = await getRelatedProducts(slug, 4);
  
  return <ProductPageContent product={product} relatedProducts={relatedProducts} />;
}