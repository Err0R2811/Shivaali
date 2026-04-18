"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Heart, Phone, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { href: "/sarees", label: "Sarees" },
  { href: "/lehengas", label: "Lehengas" },
  { href: "/kurtis", label: "Kurtis" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-center text-xs sm:text-sm py-2 px-4 font-medium tracking-wide">
        Free Shipping on orders above ₹5,000 &nbsp;|&nbsp; Use code <span className="font-bold">FESTIVE20</span> for 20% off
      </div>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "glass-nav shadow-lg border-b border-border/50"
            : "bg-background/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4 lg:px-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden cursor-pointer p-2 -ml-2 text-foreground hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <span className="font-display text-3xl md:text-4xl font-bold tracking-tight text-primary">
              Shivaali
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 cursor-pointer group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="hidden sm:flex p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden sm:flex p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="flex p-2.5 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
            <Link
              href="https://wa.me/919876543210"
              target="_blank"
              className="flex p-2.5 rounded-full text-foreground/70 hover:text-green-600 hover:bg-green-50 transition-all duration-200 cursor-pointer"
              aria-label="WhatsApp"
            >
              <Phone className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-background z-[70] shadow-2xl flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-5 border-b">
                <span className="font-display text-2xl font-bold text-primary">
Shivaali
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-6 py-4 text-lg font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="p-5 border-t space-y-3">
                <Link
                  href="https://wa.me/919876543210"
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
