"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, getUnitPrice } from "@/context/CartContext";

// Controlled quantity input allowing user to backspace completely and type custom numbers
function ItemQtyInput({
  qty,
  onQtyChange,
}: {
  qty: number;
  onQtyChange: (val: number) => void;
}) {
  const [localVal, setLocalVal] = useState<string>(qty.toString());

  useEffect(() => {
    setLocalVal(qty.toString());
  }, [qty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const str = e.target.value;
    setLocalVal(str);
    if (str === "") return; // Allow user to completely delete the digit
    const num = parseInt(str, 10);
    if (!isNaN(num) && num > 0) {
      onQtyChange(num);
    }
  };

  const handleBlur = () => {
    const num = parseInt(localVal, 10);
    if (isNaN(num) || num <= 0) {
      setLocalVal("1");
      onQtyChange(1);
    } else {
      setLocalVal(num.toString());
      onQtyChange(num);
    }
  };

  return (
    <input
      type="number"
      min="1"
      value={localVal}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-11 text-center font-black text-sm sm:text-base text-brand-primary bg-transparent focus:outline-none focus:bg-white focus:ring-1 focus:ring-brand-primary rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      aria-label="Кількість товару"
    />
  );
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    openOrder,
    updateQty,
    removeItem,
    totalPrice,
    totalSavings,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    closeCart();
    openOrder();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="relative z-[101] w-full sm:w-[420px] max-w-full h-full bg-white flex flex-col shadow-2xl overflow-hidden"
          >
            {/* ── HEADER ── */}
            <div className="bg-brand-primary text-white px-6 py-5 flex items-center justify-between shrink-0 shadow-md">
              <h2 className="text-2xl font-serif font-bold tracking-wide">
                Кошик
              </h2>

              {/* Close Button */}
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Закрити кошик"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* ── BODY ── */}
            <div className="flex-1 bg-white overflow-y-auto p-4 sm:p-6 flex flex-col">
              {items.length === 0 ? (
                // Empty State
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-brand-primary mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">
                    Кошик порожній
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs mb-6">
                    Оберіть NFC-картку та натисніть «Купити зараз», щоб додати її у кошик.
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-sm cursor-pointer"
                  >
                    До каталогу
                  </button>
                </div>
              ) : (
                // Item List
                <div className="space-y-4">
                  {/* Wholesale Pricing Info Helper — no plus sign, 3 rows, dark blue #0B2C6B theme */}
                  <div className="bg-brand-light border-2 border-brand-primary/25 rounded-2xl p-4 shadow-xs">
                    <div className="font-black text-sm sm:text-base mb-2 text-brand-primary">
                      Оптові знижки на замовлення:
                    </div>
                    <div className="flex flex-col gap-2 text-xs sm:text-sm font-bold text-brand-primary">
                      <div className="flex items-center justify-between border-b border-brand-primary/15 pb-1.5">
                        <span>• 10–29 шт:</span>
                        <span className="font-black text-brand-primary text-sm sm:text-base">449 грн/шт</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-brand-primary/15 pb-1.5">
                        <span>• 30–99 шт:</span>
                        <span className="font-black text-brand-primary text-sm sm:text-base">399 грн/шт</span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span>• 100+ шт:</span>
                        <span className="font-black text-brand-primary text-sm sm:text-base">349 грн/шт</span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  {items.map((item) => {
                    const unitPrice = getUnitPrice(item.qty);
                    const isDiscounted = unitPrice < item.basePrice;
                    const subtotal = unitPrice * item.qty;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-gray-200 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-brand-primary text-sm leading-tight truncate">
                            {item.name}
                          </h4>

                          {/* Price Per Unit */}
                          <div className="flex items-baseline gap-1.5 mt-1">
                            {isDiscounted ? (
                              <>
                                <span className="line-through text-gray-400 text-xs font-medium">
                                  {item.basePrice} грн
                                </span>
                                <span className="text-brand-primary font-black text-sm">
                                  {unitPrice} грн/шт
                                </span>
                              </>
                            ) : (
                              <span className="text-brand-primary font-black text-sm">
                                {unitPrice} грн/шт
                              </span>
                            )}
                          </div>

                          {/* Item Subtotal */}
                          <div className="text-xs text-gray-500 font-medium mt-0.5">
                            Разом: <strong className="text-brand-primary font-black">{subtotal.toLocaleString()} грн</strong>
                          </div>
                        </div>

                        {/* Qty Controls + Centered Delete Button */}
                        <div className="flex flex-col items-center justify-center gap-1 shrink-0">
                          <div className="flex items-center gap-1 bg-gray-50 border border-gray-300 rounded-full p-1 shadow-xs">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 active:scale-95 text-brand-primary flex items-center justify-center font-black text-sm shadow-xs transition-all cursor-pointer select-none"
                              aria-label="Зменшити кількість"
                            >
                              -
                            </button>

                            {/* Direct Editable Qty Input */}
                            <ItemQtyInput
                              qty={item.qty}
                              onQtyChange={(newQty) => updateQty(item.id, newQty)}
                            />

                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 rounded-full bg-brand-primary hover:bg-brand-primary-dark active:scale-95 text-white flex items-center justify-center font-black text-sm shadow-xs transition-all cursor-pointer select-none"
                              aria-label="Збільшити кількість"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Item — centered directly under the number, turns dark blue on hover */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-brand-primary active:text-brand-primary transition-colors text-xs font-semibold cursor-pointer py-0.5 text-center"
                            aria-label="Видалити товар"
                          >
                            Видалити
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── FOOTER ── */}
            {items.length > 0 && (
              <div className="bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] p-5 sm:p-6 shrink-0 space-y-4">
                {/* Total Price */}
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-medium text-gray-500">
                    До сплати:
                  </span>
                  <span className="text-3xl font-serif font-black text-brand-primary tracking-tight">
                    {totalPrice.toLocaleString()} грн
                  </span>
                </div>

                {/* Checkout CTA Button in dark blue */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-primary hover:bg-brand-primary-dark active:scale-[0.99] text-white py-4 px-6 rounded-full text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Оформити замовлення</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

