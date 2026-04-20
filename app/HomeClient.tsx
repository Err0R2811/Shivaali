"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Gift, Truck, Star, Heart, Phone, Sparkle, ShoppingBag, Camera } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { Product, Category } from "@/lib/products";

/* ── Animation variants ── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};
const fadeIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};
const stagger = { animate: { transition: { staggerChildren: 0.12 } } };
const float = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -8, transition: { duration: 0.3 } },
};

/* ── 3D Card Tilt Effect ── */
function use3DCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY((x - centerX) / 20);
    setRotateX((centerY - y) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

/* ── Static Data ── */
const features = [
  { icon: Sparkles, title: "Handcrafted", desc: "By skilled artisans" },
  { icon: Gift, title: "Premium Fabrics", desc: "Pure silks & luxury" },
  { icon: Truck, title: "Free Shipping", desc: "Above ₹5,000" },
];

const testimonials = [
  { name: "Priya Sharma", loc: "Mumbai", text: "Absolutely stunning quality! The Banarasi saree I ordered exceeded all expectations.", rating: 5 },
  { name: "Anita Reddy", loc: "Hyderabad", text: "My wedding lehenga was perfect. The craftsmanship is truly remarkable!", rating: 5 },
  { name: "Meera Patel", loc: "Delhi", text: "Fast delivery, beautiful packaging, and the kurti fits like a dream.", rating: 5 },
];

interface HomeClientProps {
  products: Product[];
  categories: Category[];
}

export default function HomeClient({ products, categories }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="flex flex-col">
      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[600px] flex items-center overflow-hidden perspective-1000">
        <motion.div 
          style={{ y: heroY }} 
          className="absolute inset-0 -top-20 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image src="/images/hero-saree.png" alt="Traditional Indian Saree" fill className="object-cover object-top" priority sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-[2]" />

        {/* Floating decorative elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute top-1/4 right-[10%] z-10 hidden lg:block"
        >
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 flex items-center justify-center"
          >
            <Sparkle className="w-10 h-10 text-accent" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.2 }}
          className="absolute bottom-1/3 right-[15%] z-10 hidden lg:block"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="w-16 h-16 rounded-full border-2 border-white/20"
          />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col justify-center text-center items-center">
          <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl flex flex-col items-center">
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-accent font-semibold tracking-[0.25em] uppercase text-xs sm:text-sm mb-5 flex items-center justify-center gap-2">
              <Sparkle className="w-3.5 h-3.5" /> Heritage Collection 2026
            </motion.p>
            <motion.h1 
              variants={fadeUp} 
              transition={{ duration: 0.6 }} 
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              Elegance in<br />
              <span className="text-accent inline-block transform-style-preserve-3d">
                <motion.span
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  Every Thread
                </motion.span>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Handcrafted luxury ethnic wear from India&apos;s finest artisans. Sarees, Lehengas & more.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/categories/sarees" className="gold-button inline-flex items-center justify-center gap-2 px-10 py-4 font-semibold text-base">
                  <ShoppingBag className="h-4 w-4" /> Shop Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="https://wa.me/919876543210" target="_blank" className="inline-flex items-center justify-center gap-2 px-10 py-4 text-foreground font-medium rounded-full text-base border border-foreground/30 hover:bg-foreground/5 transition-all">
                  <Phone className="h-4 w-4" /> WhatsApp Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-5 h-9 rounded-full border-2 border-white/40 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="text-white/50 text-xs tracking-widest uppercase"
          >
            Scroll
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════ FEATURES BAR ═══════════════ */}
      <section className="py-6 md:py-8 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} viewport={{ once: true }} className="flex items-center gap-4 justify-center sm:justify-start">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">Explore</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Shop by Category</h2>
            </div>
            <Link href="/categories" className="flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all duration-200 cursor-pointer">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.slug} 
                initial={{ opacity: 0, y: 25, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <Link href={`/categories/${cat.slug}`} className="group relative block h-[420px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer transform-style-preserve-3d">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image 
                      src={cat.image || ""} 
                      alt={cat.name} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                      <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{cat.count}</p>
                      <h3 className="font-display text-3xl font-bold text-white mb-1">{cat.name}</h3>
                      <p className="text-white/70 text-sm">{cat.sub}</p>
                      <motion.div 
                        className="mt-4 flex items-center gap-2 text-white/80 text-sm font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PRODUCTS ═══════════════ */}
      <section className="py-20 md:py-28 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">Curated</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked favorites from our latest collection</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.45 }} viewport={{ once: true }}>
                <Link href={`/products/${p.slug}`} className="group block cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-3">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(max-width: 768px) 50vw, 25vw" />
                    {p.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${p.tag === "Sale" ? "bg-red-500 text-white" : "bg-foreground text-background"}`}>
                        {p.tag}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-white" aria-label="Add to wishlist">
                      <Heart className="h-4 w-4 text-foreground" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-green-600 text-white shadow-lg text-xs sm:text-sm font-medium">
                        <Phone className="h-3.5 w-3.5" /> Buy on WhatsApp
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary text-sm sm:text-base">₹{p.price.toLocaleString("en-IN")}</span>
                    {p.originalPrice > p.price && (
                      <>
                        <span className="text-xs text-muted-foreground line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-green-600 font-medium">{Math.round((1 - p.price / p.originalPrice) * 100)}% off</span>
                      </>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-medium tracking-[0.2em] uppercase text-xs mb-3">Testimonials</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">What Our Customers Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name} 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotateX: 2 }}
                className="perspective-500"
              >
                <div className="backdrop-blur-xl bg-white/60 dark:bg-black/40 border border-white/20 rounded-2xl p-7 shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                  <div className="flex gap-1 mb-5">
                    {[...Array(t.rating)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                      >
                        <Star className="w-4 h-4 fill-accent text-accent" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-6 font-medium">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    >
                      {t.name.charAt(0)}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.loc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Luxury warm gradient background - maroon & gold tones */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A1028]/95 via-[#2D1B3D] to-[#1A0F1A]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('/images/gold-shimmer.png')] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#CA8A04]/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Elegant border frame */}
            <div className="absolute inset-0 rounded-3xl border border-[#CA8A04]/20" />
            <div className="absolute inset-[1px] rounded-[23px] border border-white/5" />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 px-8 py-16 md:py-24 text-center"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Subtle divider with gold accent */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#CA8A04]/60" />
                  <Sparkle className="w-4 h-4 text-[#CA8A04]" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#CA8A04]/60" />
                </div>
                
                {/* Typography hierarchy - luxury feel */}
                <p className="text-[#CA8A04] font-medium tracking-[0.3em] uppercase text-xs mb-4">
                  Exclusive Collection
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Discover Your{' '}
                  <span className="text-[#CA8A04]">
                    Perfect Look
                  </span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                  Each piece in our collection is a masterpiece of traditional craftsmanship, 
                  created by skilled artisans using age-old techniques.
                </p>
                
                {/* Refined buttons with gold gradient */}
                <motion.div 
                  className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Gold primary button */}
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="/categories/sarees" 
                      className="gold-button inline-flex items-center justify-center gap-2.5 px-10 py-4 font-semibold text-base tracking-wide"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Explore Collection
                    </Link>
                  </motion.div>
                  
                  {/* Elegant secondary buttons */}
                  <motion.div 
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(202,138,4,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="https://wa.me/919876543210" 
                      target="_blank" 
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-[#CA8A04]/50 text-[#CA8A04] hover:border-[#CA8A04] font-medium text-base tracking-wide transition-all duration-300"
                    >
                      <Phone className="h-4 w-4" /> Chat on WhatsApp
                    </Link>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(202,138,4,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="https://www.instagram.com/shivaali.in" 
                      target="_blank" 
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-[#CA8A04]/50 text-[#CA8A04] hover:border-[#CA8A04] font-medium text-base tracking-wide transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                      Follow on Instagram
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
