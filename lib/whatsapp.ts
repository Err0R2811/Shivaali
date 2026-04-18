import type { CartItem } from "./cart-context";

const WHATSAPP_NUMBER = "919876543210"; // Change to your shop's WhatsApp number
const SHOP_OWNER_NAME = "Shivaali";

/**
 * Formats cart items into a WhatsApp-ready order message and
 * returns the full wa.me URL to open in a new tab.
 */
export function buildWhatsAppCheckoutUrl(
  items: CartItem[],
  subtotal: number
): string {
  const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  // Header
  let msg = `Hello ${SHOP_OWNER_NAME} 👋\n\n`;
  msg += `I would like to place an order:\n\n`;
  msg += `🛍 Products:\n`;

  // Product lines
  items.forEach((item, i) => {
    msg += `${i + 1}. ${item.name}\n`;
    msg += `   Size: ${item.size}\n`;
    msg += `   Qty: ${item.quantity}\n`;
    msg += `   Price: ${formatPrice(item.price * item.quantity)}\n`;
    if (i < items.length - 1) msg += `\n`;
  });

  // Total
  msg += `\n💰 Total: ${formatPrice(subtotal)}\n\n`;
  msg += `Please confirm availability. Thank you!`;

  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Builds a WhatsApp URL for a single product "Buy Now" action.
 */
export function buildWhatsAppSingleProductUrl(
  name: string,
  price: number,
  size?: string
): string {
  const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  let msg = `Hello ${SHOP_OWNER_NAME} 👋\n\n`;
  msg += `I'm interested in:\n\n`;
  msg += `🛍 ${name}\n`;
  if (size) msg += `   Size: ${size}\n`;
  msg += `   Price: ${formatPrice(price)}\n\n`;
  msg += `Please confirm availability. Thank you!`;

  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
