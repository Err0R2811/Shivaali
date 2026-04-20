"use client";

import Link from "next/link";
import { Phone, Camera, MapPin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const shopLinks = [
  { href: "/categories/sarees", label: "Sarees" },
  { href: "/categories/lehengas", label: "Lehengas" },
  { href: "/categories/kurtis", label: "Kurtis" },
  { href: "/dupattas", label: "Dupattas" },
  { href: "/new-arrivals", label: "New Arrivals" },
];

const helpLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Newsletter strip */}
      <div className="bg-primary/5 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Stay in the Loop
              </h3>
              <p className="text-muted-foreground mt-1">
                Be the first to know about new arrivals & exclusive offers
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 rounded-full border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
                aria-label="Email for newsletter"
              />
              <button className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-4 lg:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* Brand */}
            <div className="md:col-span-4 space-y-5">
              <Link href="/" className="cursor-pointer inline-block">
                <span className="font-display text-4xl font-bold text-background">
                  Shivaali
                </span>
              </Link>
              <p className="text-background/60 leading-relaxed max-w-sm">
                Discover the elegance of traditional Indian ethnic wear.
                Curated with love, crafted for perfection. Every thread tells a
                story.
              </p>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/shivaali.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/60 transition-all duration-200 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-green-400 hover:border-green-400/60 transition-all duration-200 cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Shop */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/40">
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/40">
                Help
              </h4>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-background/40">
                Get in Touch
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-background/60">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-background/40" />
                  <span>
                    42, Heritage Lane, Colaba,
                    <br />
                    Mumbai, Maharashtra 400001
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors cursor-pointer"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-background/40" />
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@shivaali.com"
                    className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors cursor-pointer"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-background/40" />
                    hello@shivaali.com
                  </a>
                </li>
              </ul>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors duration-200 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                Chat on WhatsApp
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Shivaali. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-background/40">
              <Link
                href="/privacy"
                className="hover:text-background/70 transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-background/70 transition-colors cursor-pointer"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
