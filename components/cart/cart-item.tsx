"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/cart-context";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const handleMinus = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    } else {
      onRemove();
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b border-border/40 last:border-0">
      {/* Product Image */}
      <div className="relative w-20 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col h-full">
          {/* Name and Remove */}
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-medium text-sm truncate text-foreground">
              {item.name}
            </h4>
            <button
              onClick={onRemove}
              className="p-1 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Size Badge */}
          <div className="mt-1">
            <span className="inline-block px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
              {item.size}
            </span>
          </div>

          {/* Price */}
          <div className="mt-1 text-sm">
            <span className="font-semibold text-primary">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice > item.price && (
              <span className="ml-2 text-muted-foreground line-through text-xs">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-auto pt-2">
            <button
              onClick={handleMinus}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="h-8 w-8 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>

            {/* Line item total */}
            <span className="ml-auto text-sm font-semibold">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}