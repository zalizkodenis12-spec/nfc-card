"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import MenuSection from "@/components/MenuSection";
import HistorySection from "@/components/HistorySection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import HeroSection from "@/components/HeroSection";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[#06142E] flex justify-center text-brand-text selection:bg-brand-accent selection:text-white">
      {/* 📱 ЄДИНА МОБІЛЬНА ВЕРСІЯ САЙТУ (max-w-[480px] по центру екрана на всіх пристроях) */}
      <main className="w-full max-w-[480px] bg-white min-h-screen relative shadow-[0_0_60px_rgba(0,0,0,0.6)] overflow-x-hidden flex flex-col">
        <PageIntro />

        {/* Navbar — чистий мобільний хедер */}
        <div className="relative w-full pt-3 pb-5 bg-brand-primary z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex items-center justify-between w-full px-3"
          >
            {/* Mobile Hamburger Button */}
            <button
              className="flex items-center justify-center p-2 text-white z-[60] relative cursor-pointer hover:text-brand-link-hover transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo (centered) */}
            <div className="text-2xl font-bold text-white tracking-wider cursor-pointer z-50 whitespace-nowrap">
              <span>DWS Cards</span>
            </div>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center p-2 text-white z-[60] cursor-pointer hover:text-brand-link-hover transition-colors"
              aria-label="Кошик"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute 0 top-0.5 right-0 bg-[#184F9E] text-white font-bold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {totalCount}
                </span>
              )}
            </button>
          </motion.div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-brand-primary pb-6 px-6 shadow-2xl flex flex-col gap-4 font-sans font-semibold text-base tracking-widest uppercase text-white z-50 border-t border-white/10">
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block mt-3">Комплект</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Переваги</a>
              <a href="#history" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Як замовити</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Відгуки</a>
              <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Контакти</a>
            </div>
          )}

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[calc(100%-1px)] -scale-y-100">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[35px]">
              <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="fill-brand-primary"></path>
            </svg>
          </div>
        </div>

        {/* === HERO BLOCK (мобільний) === */}
        <HeroSection />

        {/* === BLOCKS === */}
        <MenuSection />
        <HistorySection />
        <AboutSection />
        <ReviewsSection />
        <Footer />

        {/* Cart Drawer Panel */}
        <CartDrawer />
      </main>
    </div>
  );
}
