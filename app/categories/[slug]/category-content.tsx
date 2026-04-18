"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { staticCategories as categories, type Product, type CategorySlug } from "@/lib/products";
import { ChevronRight, Star, Heart, Phone } from "lucide-react";

/* ── Animation variants ── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

/* ── Props ── */
interface CategoryPageContentProps {
  slug: CategorySlug;
  products: Product[];
}

/* ── Breadcrumb Component ── */
function Breadcrumb({ categoryName }: { categoryName: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-6">
      <Link href="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link href="/categories" className="hover:text-primary transition-colors">
        Categories
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-foreground font-medium">{categoryName}</span>
    </nav>
  );
}

/* ── Product Card Component ── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={`/products/${product.slug}`} className="group block cursor-pointer">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-3">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {/* Tag */}
          {product.tag && (
            <span
              className={`absolute top-3 left-3 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${
                product.tag === "Sale"
                  ? "bg-red-500 text-white"
                  : "bg-foreground text-background"
              }`}
            >
              {product.tag}
            </span>
          )}
          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-green-600 text-white">
              {discount}% off
            </span>
          )}
          {/* Wishlist */}
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-white"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-foreground" />
          </button>
          {/* Quick action */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-green-600 text-white shadow-lg text-xs sm:text-sm font-medium">
              <Phone className="h-3.5 w-3.5" /> Buy on WhatsApp
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-primary text-sm sm:text-base">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
          {discount > 0 && (
            <span className="text-xs text-green-600 font-medium">{discount}% off</span>
          )}
        </div>
        <div className="flex gap-0.5 mt-1.5">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              className={`w-3 h-3 ${j < 4 ? "fill-accent text-accent" : "text-muted"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">(42)</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main Page Component ── */
export default function CategoryPageContent({ slug, products }: CategoryPageContentProps) {
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 lg:px-8 pt-20">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <Breadcrumb categoryName={category.name} />
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
            >
              {category.name}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg text-white/80 max-w-lg"
            >
              {category.sub} - {category.count}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PRODUCTS GRID ═══════════════ */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{products.length}</span>{" "}
              products in {category.name}
            </p>
          </motion.div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No products available in this category yet.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Other Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}