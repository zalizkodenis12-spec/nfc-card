"use client";

import React, { useState, useEffect } from "react";
import { useCart, getUnitPrice } from "@/context/CartContext";
import { useCardTheme } from "@/context/ThemeContext";

export default function OrderModal() {
  const {
    items,
    totalPrice,
    isOrderOpen,
    startCloseOrderTransition,
    clearCart,
    isTransitioning,
  } = useCart();
  const { currentTheme } = useCardTheme();

  // Form inputs
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  // Validation & UI states
  const [touched, setTouched] = useState<{ name?: boolean; telegram?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if current theme or any item in cart is custom
  const isCustomTheme =
    currentTheme.id === "dws" || items.some((it) => it.id === "nfc-card-dws");

  // Reset states when opened
  useEffect(() => {
    if (isOrderOpen) {
      document.body.style.overflow = "hidden";
      setIsSuccess(false);
      setErrorMessage("");
      setTouched({});
      setPhotos([]);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOrderOpen]);

  // Handle photos selection (max 5)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setPhotos((prev) => [...prev, ...selectedFiles].slice(0, 5));
    e.target.value = "";
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Validation rules (Requirements: name >= 2 chars; telegram MUST start with "@" and have at least 1 char after)
  const isNameValid = name.trim().length >= 2;
  const cleanTg = telegram.trim();
  const isTgValid = cleanTg.startsWith("@") && cleanTg.length >= 2;

  const handleClose = () => {
    if (isLoading || isTransitioning) return;
    startCloseOrderTransition();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOrderOpen && !isLoading && !isTransitioning) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOrderOpen, isLoading, isTransitioning]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, telegram: true });

    if (!isNameValid || !isTgValid) {
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Ваш кошик порожній");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("telegram", cleanTg);
      formData.append("comment", comment.trim());
      formData.append("totalPrice", String(totalPrice));
      formData.append(
        "cartItems",
        JSON.stringify(
          items.map((item) => ({
            name: item.name,
            qty: item.qty,
            price: getUnitPrice(item.qty),
          }))
        )
      );

      photos.forEach((file) => {
        formData.append("photos", file);
      });

      const res = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Не вдалося відправити замовлення");
      }

      // Success
      setIsSuccess(true);
      clearCart();

      // Automatically close after 2.6 seconds with reverse curtain transition
      setTimeout(() => {
        startCloseOrderTransition();
      }, 2600);
    } catch (err: any) {
      console.error("Order submission error:", err);
      setErrorMessage(err.message || "Помилка при оформленні. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOrderOpen) return null;

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          1. MOBILE VERSION (< md): EXACT SAME AS ORIGINAL (ЕТАЛОН)
          ══════════════════════════════════════════════════════════════ */}
      <div className="md:hidden fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-sm">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-primary/15 my-auto max-h-[92vh] flex flex-col">
          {/* Header */}
          <div className="bg-brand-primary text-white px-6 py-5 flex items-center justify-between shrink-0 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Оформлення замовлення
            </h2>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading || isTransitioning}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Закрити форму"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {isSuccess ? (
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-primary">
                  Заявку прийнято!
                </h3>
                <p className="text-gray-600 font-medium text-base sm:text-lg max-w-sm">
                  Дякуємо! Ми зв&apos;яжемось з вами в Telegram найближчим часом для уточнення деталей.
                </p>
                <div className="pt-2">
                  <span className="inline-block text-xs font-bold text-brand-primary/60 bg-brand-light px-4 py-2 rounded-full">
                    Повертаємо вас на сайт...
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Mini Cart Summary */}
                {items.length > 0 && (
                  <div className="bg-brand-light border border-brand-primary/20 rounded-2xl p-4 shadow-xs">
                    <div className="flex items-center justify-between font-black text-xs sm:text-sm text-brand-primary uppercase tracking-wider mb-2.5">
                      <span>Ваше замовлення:</span>
                      <span className="text-gray-500 lowercase font-normal">{items.length} поз.</span>
                    </div>

                    <div className="divide-y divide-brand-primary/10 max-h-36 overflow-y-auto pr-1">
                      {items.map((item) => {
                        const unitPrice = getUnitPrice(item.qty);
                        const itemTotal = unitPrice * item.qty;
                        return (
                          <div key={item.id} className="py-2 flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-9 h-9 rounded-lg object-cover bg-white shrink-0 border border-brand-primary/15"
                              />
                              <div className="truncate">
                                <p className="font-bold text-brand-primary truncate">{item.name}</p>
                                <p className="text-gray-500 text-[11px]">
                                  {item.qty} шт. × {unitPrice} грн
                                </p>
                              </div>
                            </div>
                            <span className="font-black text-brand-primary shrink-0">
                              {itemTotal.toLocaleString()} грн
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-brand-primary/20 pt-2.5 mt-2 flex items-baseline justify-between">
                      <span className="text-sm font-bold text-gray-700">Разом до сплати:</span>
                      <span className="text-xl font-serif font-black text-brand-primary">
                        {totalPrice.toLocaleString()} грн
                      </span>
                    </div>
                  </div>
                )}

                {/* Field 1: Name */}
                <div>
                  <label htmlFor="order-name-mobile" className="block text-xs sm:text-sm font-bold text-brand-primary mb-1.5">
                    Ім&apos;я <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="order-name-mobile"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                    placeholder="Як до вас звертатися?"
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl border ${
                      touched.name && !isNameValid
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                    } focus:ring-2 outline-none text-base font-medium transition-all text-gray-900 bg-gray-50/50 focus:bg-white`}
                  />
                  {touched.name && !isNameValid && (
                    <p className="text-xs text-red-500 font-semibold mt-1">
                      Введіть щонайменше 2 символи
                    </p>
                  )}
                </div>

                {/* Field 2: Telegram */}
                <div>
                  <label htmlFor="order-telegram-mobile" className="block text-xs sm:text-sm font-bold text-brand-primary mb-1.5">
                    Telegram <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="order-telegram-mobile"
                    type="text"
                    required
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    onBlur={() => setTouched((prev) => ({ ...prev, telegram: true }))}
                    placeholder="@username"
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl border ${
                      touched.telegram && !isTgValid
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                    } focus:ring-2 outline-none text-base font-medium transition-all text-gray-900 bg-gray-50/50 focus:bg-white`}
                  />
                  {touched.telegram && !isTgValid && (
                    <p className="text-xs text-red-500 font-semibold mt-1">
                      Вкажіть Telegram у форматі @username
                    </p>
                  )}
                </div>

                {/* Field 3: Comment */}
                <div>
                  <label htmlFor="order-comment-mobile" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">
                    Побажання / коментар <span className="text-gray-400 font-normal">(необов&apos;язково)</span>
                  </label>
                  <textarea
                    id="order-comment-mobile"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Напишіть побажання щодо дизайну або залиште порожнім"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none text-sm font-medium transition-all text-gray-900 bg-gray-50/50 focus:bg-white resize-none"
                  />
                </div>

                {/* Field 4: Custom Design Photos (Only for Custom Theme) */}
                {isCustomTheme && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs sm:text-sm font-bold text-brand-primary">
                        Фото або приклад дизайну{" "}
                        <span className="text-gray-400 font-normal">(необов&apos;язково)</span>
                      </label>
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {photos.length}/5
                      </span>
                    </div>

                    {/* Previews Grid */}
                    {photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {photos.map((file, idx) => {
                          const previewUrl = URL.createObjectURL(file);
                          return (
                            <div
                              key={idx}
                              className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm group shrink-0 bg-gray-100"
                            >
                              <img
                                src={previewUrl}
                                alt={`Фото ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] transition-colors cursor-pointer"
                                title="Видалити фото"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Upload Button */}
                    {photos.length < 5 && (
                      <div>
                        <label
                          htmlFor="order-photos-mobile"
                          className="flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2.5 border-2 border-dashed border-gray-300 hover:border-brand-primary/60 hover:bg-brand-light/30 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 cursor-pointer transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-brand-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{photos.length === 0 ? "Додати фото дизайну чи логотип" : "Додати ще фото"}</span>
                        </label>
                        <input
                          id="order-photos-mobile"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </div>
                    )}
                    <p className="text-[11px] text-gray-500 mt-1">
                      Можна прикріпити до 5 фото логотипу, ескізу чи прикладу.
                    </p>
                  </div>
                )}

                {/* Error Notice */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading || isTransitioning}
                    className="w-full min-h-[52px] bg-brand-accent hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 px-6 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Відправляємо заявку...</span>
                      </>
                    ) : (
                      <>
                        <span>Відправити заявку</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. DESKTOP VERSION (>= md): FULLSCREEN IMMERSIVE PAGE
          ══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex fixed inset-0 z-[120] bg-brand-bg flex-col overflow-y-auto min-h-screen text-brand-body">
        {/* Desktop Top Header Bar */}
        <div className="w-full max-w-6xl mx-auto px-8 pt-8 pb-6 flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading || isTransitioning}
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-brand-primary font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-brand-primary/10"
          >
            <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
            <span>Повернутися на сайт</span>
          </button>

          {/* Centered Brand Title */}
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-serif font-black text-brand-primary tracking-tight">
              Оформлення замовлення
            </h1>
            <p className="text-xs uppercase tracking-widest text-brand-primary/60 font-black mt-1">
              DWS Cards • Офіційне замовлення
            </p>
          </div>

          {/* Close X Button */}
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading || isTransitioning}
            className="w-12 h-12 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-brand-primary/10"
            aria-label="Закрити форму"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Main Content Container */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-8 py-6 pb-16">
          {isSuccess ? (
            /* Desktop Success Screen */
            <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-12 lg:p-16 shadow-2xl border border-brand-primary/15 text-center flex flex-col items-center space-y-6 my-12">
              <div className="w-24 h-24 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-black text-brand-primary">
                Заявку успішно прийнято!
              </h2>
              <p className="text-gray-600 font-medium text-xl max-w-md leading-relaxed">
                Дякуємо! Ми зв&apos;яжемось з вами в Telegram найближчим часом для підтвердження та уточнення дизайну.
              </p>
              <div className="pt-4">
                <span className="inline-block text-sm font-bold text-brand-primary bg-brand-light px-6 py-3 rounded-full shadow-xs">
                  Повертаємо вас на сайт...
                </span>
              </div>
            </div>
          ) : (
            /* Desktop 2-Column Checkout Layout */
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left Column: Client Data Form */}
              <div className="col-span-7 bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-brand-primary/10 space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-serif font-bold text-brand-primary">
                    Контактні дані клієнта
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Заповніть форму, щоб ми зв&apos;язалися з вами для узгодження деталей
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Field 1: Name */}
                  <div>
                    <label htmlFor="order-name-desktop" className="block text-sm font-bold text-brand-primary mb-2">
                      Ваше ім&apos;я <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="order-name-desktop"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                      placeholder="Як до вас звертатися?"
                      className={`w-full min-h-[52px] px-5 py-3.5 rounded-2xl border ${
                        touched.name && !isNameValid
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                      } focus:ring-2 outline-none text-base font-medium transition-all text-gray-900 bg-gray-50/50 focus:bg-white`}
                    />
                    {touched.name && !isNameValid && (
                      <p className="text-sm text-red-500 font-semibold mt-1.5">
                        Введіть щонайменше 2 символи
                      </p>
                    )}
                  </div>

                  {/* Field 2: Telegram */}
                  <div>
                    <label htmlFor="order-telegram-desktop" className="block text-sm font-bold text-brand-primary mb-2">
                      Telegram <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="order-telegram-desktop"
                      type="text"
                      required
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, telegram: true }))}
                      placeholder="@username"
                      className={`w-full min-h-[52px] px-5 py-3.5 rounded-2xl border ${
                        touched.telegram && !isTgValid
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                      } focus:ring-2 outline-none text-base font-medium transition-all text-gray-900 bg-gray-50/50 focus:bg-white`}
                    />
                    {touched.telegram && !isTgValid && (
                      <p className="text-sm text-red-500 font-semibold mt-1.5">
                        Вкажіть Telegram у форматі @username
                      </p>
                    )}
                  </div>

                  {/* Field 3: Comment */}
                  <div>
                    <label htmlFor="order-comment-desktop" className="block text-sm font-bold text-gray-700 mb-2">
                      Побажання / коментар <span className="text-gray-400 font-normal">(необов&apos;язково)</span>
                    </label>
                    <textarea
                      id="order-comment-desktop"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Напишіть побажання щодо дизайну або залиште порожнім"
                      className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none text-base font-medium transition-all text-gray-900 bg-gray-50/50 focus:bg-white resize-none"
                    />
                  </div>

                  {/* Field 4 Desktop: Custom Design Photos (Only for Custom Theme) */}
                  {isCustomTheme && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-bold text-brand-primary">
                          Фото або приклад дизайну{" "}
                          <span className="text-gray-400 font-normal">(необов&apos;язково)</span>
                        </label>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                          {photos.length} з 5 фото
                        </span>
                      </div>

                      {/* Previews Grid Desktop */}
                      {photos.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-3">
                          {photos.map((file, idx) => {
                            const previewUrl = URL.createObjectURL(file);
                            return (
                              <div
                                key={idx}
                                className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group shrink-0 bg-gray-100"
                              >
                                <img
                                  src={previewUrl}
                                  alt={`Фото ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemovePhoto(idx)}
                                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer"
                                  title="Видалити фото"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Upload Button Desktop */}
                      {photos.length < 5 && (
                        <div>
                          <label
                            htmlFor="order-photos-desktop"
                            className="flex items-center justify-center gap-2.5 w-full min-h-[50px] px-5 py-3 border-2 border-dashed border-gray-300 hover:border-brand-primary/60 hover:bg-brand-light/40 rounded-2xl text-sm font-semibold text-gray-700 cursor-pointer transition-colors"
                          >
                            <svg
                              className="w-5 h-5 text-brand-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>
                              {photos.length === 0
                                ? "Прикріпити фото / логотип (до 5 шт)"
                                : "Додати ще фото"}
                            </span>
                          </label>
                          <input
                            id="order-photos-desktop"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1.5">
                        Можна прикріпити логотип, скриншот чи приклад бажаного оформлення.
                      </p>
                    </div>
                  )}

                  {/* Error Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-3">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button Desktop */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading || isTransitioning}
                      className="w-full min-h-[58px] bg-brand-accent hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 px-8 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                          </svg>
                          <span>Відправляємо заявку в Telegram...</span>
                        </>
                      ) : (
                        <>
                          <span>Відправити заявку</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Mini Cart Summary */}
              <div className="col-span-5 bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-brand-primary/10 sticky top-8 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-serif font-bold text-brand-primary">
                    Ваше замовлення
                  </h3>
                  <span className="text-xs font-bold bg-brand-light text-brand-primary px-3 py-1 rounded-full">
                    {items.length} поз.
                  </span>
                </div>

                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-2 space-y-2">
                  {items.map((item) => {
                    const unitPrice = getUnitPrice(item.qty);
                    const itemTotal = unitPrice * item.qty;
                    return (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover bg-gray-50 shrink-0 border border-gray-200"
                          />
                          <div className="truncate">
                            <p className="font-bold text-brand-primary text-sm truncate">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.qty} шт. × {unitPrice} грн
                            </p>
                          </div>
                        </div>
                        <span className="font-black text-brand-primary text-base shrink-0">
                          {itemTotal.toLocaleString()} грн
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Total Section */}
                <div className="bg-brand-light rounded-2xl p-5 border border-brand-primary/15 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-gray-600">Разом до сплати:</span>
                    <span className="text-3xl font-serif font-black text-brand-primary">
                      {totalPrice.toLocaleString()} грн
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    * Ціна враховує автоматичну оптову знижку
                  </p>
                </div>

                {/* Badges */}
                <div className="space-y-2.5 pt-2 text-xs text-gray-600 font-semibold">
                  <div className="flex items-center gap-2">
                    <span>⚡</span> <span>Швидкий зв&apos;язок менеджера в Telegram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚚</span> <span>Доставка по всій Україні</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔒</span> <span>Безпечне замовлення без передоплати</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
