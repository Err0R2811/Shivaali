import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Order Confirmed | Rivaaj Ethnic Store",
  description: "Your order has been placed successfully via WhatsApp",
};

export default function SuccessLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
