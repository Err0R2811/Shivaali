"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  ShoppingBag,
  Phone,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

/* ── Types ── */
interface ContactForm {
  name: string;
  address: string;
  phone: string;
  altPhone: string;
  whatsapp: string;
}

const initialForm: ContactForm = {
  name: "",
  address: "",
  phone: "",
  altPhone: "",
  whatsapp: "",
};

/* ── Steps ── */
const steps = [
  { id: 1, label: "Review", sub: "Cart items" },
  { id: 2, label: "Details", sub: "Contact info" },
];

/* ── Helpers ── */
const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210";

/* ══════════════════════════════════════ */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  /* ── Validation ── */
  const validate = (): boolean => {
    const errs: Partial<ContactForm> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!form.whatsapp.trim()) errs.whatsapp = "WhatsApp number is required";
    else if (!/^[6-9]\d{9}$/.test(form.whatsapp.replace(/\s/g, "")))
      errs.whatsapp = "Enter a valid 10-digit number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── WhatsApp submission ── */
  const handleSubmit = () => {
    if (!validate()) return;

    let msg = `Hello Shivaali 👋\n\n`;
    msg += `I would like to place an order:\n\n`;
    msg += `🛍 *Products:*\n\n`;

    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name}\n`;
      msg += `   Size: ${item.size}\n`;
      msg += `   Qty: ${item.quantity}\n`;
      msg += `   Price: ${formatPrice(item.price * item.quantity)}\n`;
      if (i < items.length - 1) msg += `\n`;
    });

    msg += `\n----------------------------\n\n`;
    msg += `💰 *Total: ${formatPrice(subtotal)}*\n\n`;
    msg += `📍 Delivery Location: ${form.address}\n`;
    msg += `📞 Phone: ${form.phone}\n`;
    if (form.altPhone) msg += `📞 Alt Phone: ${form.altPhone}\n`;
    msg += `\nPlease confirm availability. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`,
      "_blank",
      "noopener,noreferrer"
    );
    clearCart();
    router.push("/checkout/success");
  };

  /* ── Empty state ── */
  if (items.length === 0 && step === 1) {
    return (
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ShoppingBag className="h-20 w-20 text-muted-foreground/40 mb-6" />
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground mb-8">
          Add some beautiful ethnic wear to get started!
        </p>
        <Link href="/categories/sarees">
          <Button className="gold-button px-8 py-3 rounded-full cursor-pointer">
            Browse Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 pt-28 pb-20 max-w-3xl">
      {/* ═══════════════ STEPPER ═══════════════ */}
      <nav aria-label="Checkout steps" className="mb-12">
        <div className="flex items-center justify-center gap-0">
          {steps.map((s, i) => {
            const isComplete = step > s.id;
            const isActive = step === s.id;

            return (
              <div key={s.id} className="flex items-center">
                {/* Connector line (before step, except first) */}
                {i > 0 && (
                  <div
                    className={`h-[2px] w-16 sm:w-24 transition-colors duration-300 ${
                      isComplete || isActive ? "bg-[#CA8A04]" : "bg-border"
                    }`}
                  />
                )}

                {/* Step circle + label */}
                <button
                  onClick={() => {
                    if (isComplete) setStep(s.id);
                  }}
                  disabled={!isComplete}
                  className={`flex flex-col items-center gap-2 ${
                    isComplete ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all duration-300 ${
                      isComplete
                        ? "bg-[#CA8A04] border-[#CA8A04] text-white"
                        : isActive
                        ? "border-[#CA8A04] text-[#CA8A04] bg-[#CA8A04]/10"
                        : "border-border text-muted-foreground bg-muted"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      s.id
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-xs font-semibold ${
                        isActive || isComplete
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">
                      {s.sub}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      {/* ═══════════════ STEP CONTENT ═══════════════ */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── Cart Review ── */}
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Review Your Order
            </h2>

            <div className="space-y-4">
              {items.map((item) => {
                const discount = Math.round(
                  (1 - item.price / item.originalPrice) * 100
                );
                return (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 shadow-sm"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Size: {item.size}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-primary">
                          {formatPrice(item.price)}
                        </span>
                        {discount > 0 && (
                          <span className="text-[10px] text-green-600 font-medium">
                            {discount}% off
                          </span>
                        )}
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 hover:bg-muted transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-sm font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 hover:bg-muted transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size)
                          }
                          className="p-1.5 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>

                        <span className="ml-auto text-sm font-semibold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal + Continue */}
            <div className="mt-8 p-5 rounded-xl bg-card border border-border/50">
              <div className="flex justify-between items-center mb-5">
                <span className="text-lg font-medium text-foreground">
                  Subtotal
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Button
                onClick={() => setStep(2)}
                className="w-full gold-button py-3 rounded-xl text-base font-semibold cursor-pointer"
                size="lg"
              >
                Continue to Contact Details
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── Contact Form ── */}
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Cart Review
            </button>

            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Contact &amp; Delivery Details
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Delivery Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete delivery address"
                  rows={3}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Alternate Phone */}
              <div className="space-y-2">
                <Label htmlFor="altPhone" className="text-sm font-medium">
                  Alternate Phone{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="altPhone"
                  type="tel"
                  placeholder="Alternate contact number"
                  value={form.altPhone}
                  onChange={(e) =>
                    setForm({ ...form, altPhone: e.target.value })
                  }
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-sm font-medium">
                  WhatsApp Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="WhatsApp number for order updates"
                  value={form.whatsapp}
                  onChange={(e) =>
                    setForm({ ...form, whatsapp: e.target.value })
                  }
                  className={errors.whatsapp ? "border-red-500" : ""}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-red-500">{errors.whatsapp}</p>
                )}
              </div>

              {/* Order summary mini */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50 mt-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                  Order Summary
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-base font-semibold cursor-pointer"
                size="lg"
              >
                <Phone className="h-4 w-4 mr-2" />
                Place Order via WhatsApp
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your order will be sent via WhatsApp. Our team will confirm
                availability and delivery details.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
