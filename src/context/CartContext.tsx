"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  basePrice: number; // 499
  qty: number;
}

export function getUnitPrice(qty: number): number {
  if (qty >= 100) return 349;
  if (qty >= 30) return 399;
  if (qty >= 10) return 449;
  return 499;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  totalPrice: number;
  totalSavings: number;
  isOrderOpen: boolean;
  openOrder: () => void;
  closeOrder: () => void;
  addItem: (product: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);

  const openOrder = () => setIsOrderOpen(true);
  const closeOrder = () => setIsOrderOpen(false);

  const addItem = (product: Omit<CartItem, "qty">, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const { totalCount, totalPrice, totalSavings } = useMemo(() => {
    let count = 0;
    let price = 0;
    let savings = 0;

    for (const item of items) {
      count += item.qty;
      const unitPrice = getUnitPrice(item.qty);
      price += unitPrice * item.qty;
      savings += (item.basePrice - unitPrice) * item.qty;
    }

    return { totalCount: count, totalPrice: price, totalSavings: savings };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isOrderOpen,
        totalCount,
        totalPrice,
        totalSavings,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        openOrder,
        closeOrder,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
