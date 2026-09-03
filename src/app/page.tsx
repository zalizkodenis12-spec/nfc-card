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
    <main className="relative w-full bg-brand-bg">
      <PageIntro />

      {/* Navbar — scrolls with page */}
      <div className="relative w-full pt-4 pb-6 bg-brand-primary z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-16"
        >
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-2 -ml-2 text-white z-[60] relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Left Nav */}
          <div className="hidden md:flex flex-1 w-full items-center justify-evenly font-sans font-extrabold text-sm tracking-widest uppercase text-white pr-8 lg:pr-16">
            <a href="#menu" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Комплект</a>
            <a href="#about" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Переваги</a>
            <a href="#history" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Як замовити</a>
          </div>

          {/* Logo (centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold text-white tracking-wider cursor-pointer z-50 whitespace-nowrap">
            <span>DWS Cards</span>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden md:flex flex-1 w-full items-center justify-evenly font-sans font-extrabold text-sm tracking-widest uppercase text-white pl-8 lg:pl-16 z-[60]">
            <a href="#reviews" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Відгуки</a>
            <a href="#contacts" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Контакти</a>
            {/* Cart Icon Desktop */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center text-white hover:text-brand-link-hover transition-colors cursor-pointer p-1"
              aria-label="Кошик"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#184F9E] text-white font-bold text-[11px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart Icon */}
          <button
            onClick={openCart}
            className="md:hidden ml-auto flex items-center justify-center p-2 -mr-2 text-white z-[60] relative cursor-pointer"
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

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-brand-primary pb-6 px-6 shadow-xl flex flex-col gap-4 font-sans font-semibold text-lg tracking-widest uppercase text-white md:hidden z-50 border-t border-white/10">
            <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block mt-2">Комплект</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Переваги</a>
            <a href="#history" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Як замовити</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Відгуки</a>
            <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Контакти</a>
          </div>
        )}

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[calc(100%-1px)] -scale-y-100">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px]">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="fill-brand-primary"></path>
          </svg>
        </div>
      </div>


      {/* === HERO BLOCK === */}
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
  );
}
