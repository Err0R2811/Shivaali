"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ChevronRight, Star, Heart, Phone, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/* ── Animation variants ── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/* ── Props ── */
interface ProductPageContentProps {
  product: Product;
  relatedProducts: Product[];
}

/* ── Breadcrumb Component ── */
function Breadcrumb({ product }: { product: Product }) {
  const categoryNames: Record<string, string> = {
    sarees: "Sarees",
    lehengas: "Lehengas",
    kurtis: "Kurtis",
  };
  const categoryName = categoryNames[product.category] || product.category;

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
      <Link href={`/categories/${product.category}`} className="hover:text-primary transition-colors">
        {categoryName}
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
    </nav>
  );
}

/* ── Size Selector Component ── */
function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`min-w-[48px] px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
            selected === size
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:border-primary/50 text-foreground"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

/* ── Related Product Card Component ── */
function RelatedProductCard({ product }: { product: Product }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <Link href={`/products/${product.slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.tag === "Sale" ? "bg-red-500 text-white" : "bg-foreground text-background"
            }`}
          >
            {product.tag}
          </span>
        )}
      </div>
      <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
        {product.name}
      </h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-bold text-primary text-sm">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {discount > 0 && (
          <>
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-green-600 font-medium">{discount}% off</span>
          </>
        )}
      </div>
    </Link>
  );
}

/* ── Main Page Component ── */
export default function ProductPageContent({ product, relatedProducts }: ProductPageContentProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const { addItem, openCart } = useCart();

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: selectedSize,
    });
    
    openCart();
  };

  return (
    <div className="flex flex-col">
      {/* ═══════════════ BREADCRUMB & PRODUCT ═══════════════ */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumb product={product} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* ═══ PRODUCT IMAGES ═══ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {product.tag && (
                  <span
                    className={`absolute top-4 left-4 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full ${
                      product.tag === "Sale"
                        ? "bg-red-500 text-white"
                        : "bg-foreground text-background"
                    }`}
                  >
                    {product.tag}
                  </span>
                )}
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5 text-foreground" />
                </button>
              </div>
            </motion.div>

            {/* ═══ PRODUCT DETAILS ═══ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Title & Rating */}
              <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${j < 4 ? "fill-accent text-accent" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(42 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display text-3xl md:text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                {discount > 0 && (
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">Select Size</span>
                  <button className="text-sm text-primary hover:underline cursor-pointer">
                    Size Guide
                  </button>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-14 text-base font-semibold"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-14 text-base font-medium"
                  size="lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Buy on WhatsApp
                </Button>
              </div>

              {/* Product Details */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold text-foreground mb-4">Product Details</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    100% Authentic Product
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Free Shipping on orders above ₹5,000
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    7-day return policy
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Dry clean recommended
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ RELATED PRODUCTS ═══════════════ */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-card/50">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Related Products
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <RelatedProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}