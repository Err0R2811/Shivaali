"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a pseudo order number from timestamp
    const ts = Date.now().toString(36).toUpperCase();
    setOrderNumber(`RVJ-${ts.slice(-6)}`);
  }, []);

  return (
    <div className="container mx-auto px-4 lg:px-8 pt-28 pb-20 max-w-2xl">
      <div className="flex flex-col items-center text-center">
        {/* ── Success Icon ── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative mb-8"
        >
          {/* Outer glow ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 w-24 h-24 rounded-full bg-[#CA8A04]/20 blur-xl"
          />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#CA8A04] to-[#B37700] flex items-center justify-center shadow-lg shadow-[#CA8A04]/25">
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3"
        >
          Order Placed Successfully!
        </motion.h1>

        {/* ── Order Number ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CA8A04]/10 text-[#CA8A04] text-sm font-semibold">
            Order #{orderNumber}
          </span>
        </motion.div>

        {/* ── Confirmation Message ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed mb-10"
        >
          Thank you for your order! Our team will confirm your order via
          WhatsApp shortly. Please keep your phone handy.
        </motion.p>

        {/* ── Info Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        >
          <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-foreground">
                WhatsApp Confirmation
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Our team will reach out to you on WhatsApp to confirm product
                availability and delivery details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-full bg-[#CA8A04]/10 flex items-center justify-center shrink-0">
              <ShoppingBag className="h-5 w-5 text-[#CA8A04]" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-foreground">
                Handcrafted &amp; Shipped
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Each piece is carefully quality-checked and packaged before
                shipping to your doorstep.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <Link href="/categories/sarees" className="flex-1">
            <Button
              className="w-full gold-button py-3 rounded-xl text-sm font-semibold cursor-pointer"
              size="lg"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>

          <Link href="/" className="flex-1">
            <Button
              variant="outline"
              className="w-full py-3 rounded-xl text-sm font-semibold cursor-pointer"
              size="lg"
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* ── Subtle footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xs text-muted-foreground mt-10"
        >
          Need help? WhatsApp us at{" "}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            +91 98765 43210
          </a>
        </motion.p>
      </div>
    </div>
  );
}
