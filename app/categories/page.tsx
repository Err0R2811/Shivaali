import Link from "next/link";
import Image from "next/image";
import { staticCategories as categories } from "@/lib/products";

export const metadata = {
  title: "Shop by Category - Shivaali",
  description: "Explore our collection of Indian ethnic wear - Sarees, Lehengas, and Kurtis",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our curated collection of handcrafted ethnic wear from India&apos;s finest artisans.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative block h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={cat.image || ""}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <p className="text-white/60 text-xs tracking-widest uppercase mb-1">
                    {cat.count}
                  </p>
                  <h2 className="font-display text-3xl font-bold text-white mb-1">
                    {cat.name}
                  </h2>
                  <p className="text-white/70 text-sm">{cat.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}