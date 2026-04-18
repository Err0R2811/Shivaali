import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout | Rivaaj Ethnic Store",
  description: "Complete your order and checkout via WhatsApp",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
