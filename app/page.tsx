import { getAllProducts, getCategories } from "@/lib/products";
import HomeClient from "./HomeClient";

export default async function Home() {
  const [allProducts, allCategories] = await Promise.all([
    getAllProducts(),
    getCategories()
  ]);

  // Take first 4 for featured
  const featuredProducts = allProducts.slice(0, 4);

  return <HomeClient products={featuredProducts} categories={allCategories} />;
}