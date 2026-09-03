"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import WaveCurtains from "@/components/WaveCurtains";

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
  startCheckoutTransition: () => void;
  startCloseOrderTransition: (onDone?: () => void) => void;
  isTransitioning: boolean;
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

  // Transition curtains state
  const [curtainVisible, setCurtainVisible] = useState<boolean>(false);
  const [curtainState, setCurtainState] = useState<"open" | "closed">("open");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const openOrder = () => setIsOrderOpen(true);
  const closeOrder = () => setIsOrderOpen(false);

  // 1. Site -> Order Form transition (Close site -> wait 1s -> reveal form)
  const startCheckoutTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Mount curtain in "open" position and immediately close it over the site
    setCurtainVisible(true);
    setCurtainState("open");

    requestAnimationFrame(() => {
      setCurtainState("closed");
    });

    // Curtains close in 1.0s (1000ms).
    setTimeout(() => {
      // Step 1: Close cart and mount order form behind the closed curtain
      closeCart();
      setIsOrderOpen(true);

      // Step 2: WAIT ~1 second delay (1000ms pause while covered)
      setTimeout(() => {
        // Step 3: Part curtains to reveal order form!
        setCurtainState("open");

        setTimeout(() => {
          setCurtainVisible(false);
          setIsTransitioning(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // 2. Order Form -> Site transition (Close form -> wait 1s -> reveal site)
  const startCloseOrderTransition = (onDone?: () => void) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Mount curtain and close it over the order form
    setCurtainVisible(true);
    setCurtainState("open");

    requestAnimationFrame(() => {
      setCurtainState("closed");
    });

    // Curtains close in 1.0s (1000ms).
    setTimeout(() => {
      // Step 1: Close order form behind the closed curtain
      setIsOrderOpen(false);
      if (onDone) onDone();

      // Step 2: WAIT ~1 second delay (1000ms pause while covered)
      setTimeout(() => {
        // Step 3: Part curtains to reveal the site!
        setCurtainState("open");

        setTimeout(() => {
          setCurtainVisible(false);
          setIsTransitioning(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

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
        startCheckoutTransition,
        startCloseOrderTransition,
        isTransitioning,
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
      {curtainVisible && (
        <WaveCurtains state={curtainState} duration={1.0} zIndex={300} />
      )}
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
