import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import type { Product } from "../backend";

export interface LocalCartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  localCart: LocalCartItem[];
  addToLocalCart: (product: Product, quantity: number) => void;
  removeFromLocalCart: (productId: bigint) => void;
  updateLocalCartQuantity: (productId: bigint, quantity: number) => void;
  clearLocalCart: () => void;
  localCartTotal: number;
  localCartCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [localCart, setLocalCart] = useState<LocalCartItem[]>([]);

  const addToLocalCart = useCallback((product: Product, quantity: number) => {
    setLocalCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromLocalCart = useCallback((productId: bigint) => {
    setLocalCart((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  }, []);

  const updateLocalCartQuantity = useCallback(
    (productId: bigint, quantity: number) => {
      if (quantity <= 0) {
        setLocalCart((prev) =>
          prev.filter((item) => item.product.id !== productId),
        );
      } else {
        setLocalCart((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        );
      }
    },
    [],
  );

  const clearLocalCart = useCallback(() => setLocalCart([]), []);

  const localCartTotal = localCart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  const localCartCount = localCart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        localCart,
        addToLocalCart,
        removeFromLocalCart,
        updateLocalCartQuantity,
        clearLocalCart,
        localCartTotal,
        localCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useLocalCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useLocalCart must be used within CartProvider");
  return ctx;
}
