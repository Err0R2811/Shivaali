"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { CartItemRow } from "./cart-item";
import { ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] flex flex-col"
      >
        <SheetHeader className="relative">
          <button
            onClick={closeCart}
            className="absolute right-0 top-0 p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
          <SheetTitle className="text-xl font-serif">Shopping Cart</SheetTitle>
          <SheetDescription>
            {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6">
          {items.length === 0 ? (
            <EmptyCartState onContinueShopping={closeCart} />
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <CartItemRow
                  key={`${item.productId}-${item.size}`}
                  item={item}
                  onUpdateQuantity={(qty) =>
                    updateQuantity(item.productId, item.size, qty)
                  }
                  onRemove={() => removeItem(item.productId, item.size)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with subtotal and actions */}
        {items.length > 0 && (
          <SheetFooter className="flex-col gap-3 pt-4 border-t">
            <div className="flex justify-between w-full text-lg">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold text-primary">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Clear Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive"
            >
              Clear Cart
            </Button>

            {/* Proceed to Checkout */}
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyCartState({ onContinueShopping }: { onContinueShopping: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
      <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
        Your cart is empty
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Add some items to get started
      </p>
      <Button onClick={onContinueShopping} variant="outline">
        Continue Shopping
      </Button>
    </div>
  );
}