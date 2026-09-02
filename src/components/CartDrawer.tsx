"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, getUnitPrice } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQty,
    removeItem,
    totalCount,
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

    // Format pre-filled order text for Telegram
    let orderText = "👋 Вітаю! Хочу оформити замовлення DWS Cards:%0A%0A";
    items.forEach((item, index) => {
      const unitPrice = getUnitPrice(item.qty);
      orderText += `${index + 1}. ${item.name} — ${item.qty} шт. x ${unitPrice} грн = ${item.qty * unitPrice} грн%0A`;
    });
    orderText += `%0A💰 Загальна сума: ${totalPrice} грн`;
    if (totalSavings > 0) {
      orderText += ` (Економія на опті: ${totalSavings} грн)`;
    }

    const telegramUrl = `https://t.me/absolutikdenchik?text=${orderText}`;
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
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
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-serif font-bold tracking-wide">
                  Кошик
                </h2>
                {totalCount > 0 && (
                  <span className="bg-brand-accent text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {totalCount} шт.
                  </span>
                )}
              </div>

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
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-brand-accent mb-5">
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
                    className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-sm cursor-pointer"
                  >
                    До каталогу
                  </button>
                </div>
              ) : (
                // Item List
                <div className="space-y-4">
                  {/* Wholesale Pricing Info Helper */}
                  <div className="bg-[#F0F6FF] border border-brand-accent/20 rounded-xl p-3 text-xs text-brand-primary">
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-brand-accent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Гуртові знижки на замовлення:
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[11px] text-brand-body">
                      <span>• 10-29 шт: <strong className="text-brand-primary">449 грн</strong></span>
                      <span>• 30-99 шт: <strong className="text-brand-primary">399 грн</strong></span>
                      <span className="col-span-2">• 100+ шт: <strong className="text-brand-primary">349 грн</strong></span>
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
                                <span className="text-brand-accent font-extrabold text-sm">
                                  {unitPrice} грн/шт
                                </span>
                              </>
                            ) : (
                              <span className="text-brand-primary font-bold text-sm">
                                {unitPrice} грн/шт
                              </span>
                            )}
                          </div>

                          {/* Item Subtotal */}
                          <div className="text-xs text-gray-500 font-medium mt-0.5">
                            Разом: <strong className="text-brand-primary font-bold">{subtotal.toLocaleString()} грн</strong>
                          </div>
                        </div>

                        {/* Qty Controls */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full p-1">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 rounded-full bg-white hover:bg-gray-100 active:scale-95 text-brand-primary flex items-center justify-center font-bold text-sm shadow-xs transition-all cursor-pointer"
                              aria-label="Зменшити кількість"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-black text-brand-primary">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 rounded-full bg-brand-accent hover:bg-brand-accent-hover active:scale-95 text-white flex items-center justify-center font-bold text-sm shadow-xs transition-all cursor-pointer"
                              aria-label="Збільшити кількість"
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 text-xs transition-colors cursor-pointer px-1"
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
              <div className="bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] p-5 sm:p-6 shrink-0 space-y-3">
                {/* Savings notification */}
                {totalSavings > 0 && (
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                    <span>🎉 Ваша гуртова економія:</span>
                    <span>-{totalSavings.toLocaleString()} грн</span>
                  </div>
                )}

                {/* Total Price */}
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-medium text-gray-500">
                    До сплати:
                  </span>
                  <span className="text-3xl font-serif font-black text-brand-primary tracking-tight">
                    {totalPrice.toLocaleString()} грн
                  </span>
                </div>

                {/* Checkout CTA Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover active:scale-[0.99] text-white py-4 px-6 rounded-full text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
