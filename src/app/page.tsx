"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import MenuSection from "@/components/MenuSection";
import HistorySection from "@/components/HistorySection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import { AnimatedThemeToggler } from "@/components/AnimatedThemeToggler";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative w-full bg-brand-bg">
      <PageIntro />
      {/* Navbar — classic solid blue */}
      <div className="absolute top-0 left-0 w-full pt-4 pb-6 bg-brand-primary z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="relative z-10 flex items-center justify-between w-full max-w-[1400px] mx-auto px-6 md:px-16"
        >
          
          {/* Mobile Hamburger Icon */}
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

          {/* Desktop Left Navigation Links */}
          <div className="hidden md:flex flex-1 w-full items-center justify-evenly font-sans font-extrabold text-sm tracking-widest uppercase text-white pr-8 lg:pr-16">
            <a href="#menu" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Продукти</a>
            <a href="#reviews" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Відгуки</a>
            <a href="#contacts" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Контакти</a>
          </div>

          {/* Logo (Center on mobile and desktop) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold text-white tracking-wider cursor-pointer z-50 whitespace-nowrap">
            <span>DWS Cards</span>
          </div>

          {/* Desktop Right Navigation Links & Cart */}
          <div className="hidden md:flex flex-1 w-full items-center justify-evenly font-sans font-extrabold text-sm tracking-widest uppercase text-white pl-8 lg:pl-16 z-[60]">
            <a href="#about" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Про нас</a>
            <a href="#history" className="hover:text-brand-link-hover transition-colors cursor-pointer whitespace-nowrap">Як працює</a>
            <AnimatedThemeToggler
              className="flex items-center justify-center text-white [&>svg]:w-9 [&>svg]:h-9"
              aria-label="Темна тема"
            />
          </div>

          {/* Mobile Cart Icon */}
          <AnimatedThemeToggler
            className="md:hidden ml-auto flex items-center justify-center p-2 -mr-2 text-white z-[60] relative [&>svg]:w-7 [&>svg]:h-7"
            aria-label="Темна тема"
          />
        </motion.div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-brand-primary pb-6 px-6 shadow-xl flex flex-col gap-4 font-sans font-semibold text-lg tracking-widest uppercase text-white md:hidden z-50 border-t border-white/10">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block mt-2">Про нас</a>
            <a href="#history" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Як працює</a>
            <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Продукти</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Відгуки</a>
            <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="hover:text-brand-link-hover transition-colors cursor-pointer block">Контакти</a>
          </div>
        )}

        {/* Bottom Wavy SVG for Navbar */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[calc(100%-1px)] -scale-y-100">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px]">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" className="fill-brand-primary"></path>
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
           HERO — PRODUCT-CENTRIC LAYOUT (mobile-first)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-white z-10 overflow-hidden">

        {/* ── Desktop two-column + Mobile single-column wrapper ── */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row md:items-center md:gap-10">

          {/* ── LEFT / TOP: Text block ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.8 }}
            className="w-full md:w-1/2 pt-[100px] md:pt-[120px] pb-4 md:pb-16 flex flex-col"
          >
            <h1 className="text-[2rem] sm:text-4xl md:text-5xl xl:text-6xl font-serif font-black text-brand-text leading-[1.15] mb-4 md:mb-6">
              Більше 5★ відгуків<br />без прохань і<br />незручних розмов
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-brand-body font-medium mb-7 md:mb-9 leading-relaxed max-w-md">
              NFC-картка для бізнесу. Без QR, без камери, без зайвих кліків.
            </p>

            {/* CTA Buttons — desktop only (mobile has them in the price block below) */}
            <div className="hidden md:flex gap-4">
              <a
                href="#contacts"
                className="flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white px-10 py-4 rounded-full text-base font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Замовити картку
              </a>
              <a
                href="tel:+380961592377"
                className="flex items-center justify-center bg-white hover:bg-blue-50 text-brand-accent border-2 border-brand-accent px-10 py-4 rounded-full text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                096 159 23 77
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT / BOTTOM: Product image + conversion widgets ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 2.0 }}
            className="w-full md:w-1/2 flex flex-col pt-6 md:pt-[120px]"
          >
            {/* Product image — card-style container */}
            <div className="w-full mx-auto max-w-[400px] md:max-w-full rounded-t-3xl overflow-hidden bg-[#F5F5F5] aspect-[4/3]">
              <img
                src="/hero-chair.jpeg"
                alt="DWS Cards NFC картка"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* ── BADGE STRIP ── */}
            <div className="w-full grid grid-cols-3 bg-brand-primary rounded-t-2xl overflow-hidden">
              {/* Badge 1 */}
              <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 sm:py-4 text-white border-r border-white/15 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-90">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold leading-tight">Доставка<br />1-3 дні</span>
              </div>
              {/* Badge 2 */}
              <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 sm:py-4 text-white border-r border-white/15 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-90">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold leading-tight">Гарантія<br />12 місяців</span>
              </div>
              {/* Badge 3 */}
              <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-3 sm:py-4 text-white text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-90">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 2.25 19.5Z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold leading-tight">Оплата при<br />отриманні</span>
              </div>
            </div>

            {/* ── SPLIT PRICE BAR ── */}
            <div className="w-full grid grid-cols-2">
              {/* Old price — white left half */}
              <div className="flex flex-col justify-center px-4 py-3 sm:py-4 bg-white border border-brand-primary/10">
                <span className="text-xs sm:text-sm text-gray-400 font-medium mb-0.5">Стара ціна:</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-gray-400 line-through">799 грн</span>
              </div>
              {/* New price — dark right half */}
              <div className="flex flex-col justify-center px-4 py-3 sm:py-4 bg-brand-primary">
                <span className="text-xs sm:text-sm text-white/70 font-medium mb-0.5">Акційна ціна:</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-white drop-shadow-sm">499 грн</span>
              </div>
            </div>

            {/* ── CTA BUTTON (full width) ── */}
            <a
              href="https://t.me/absolutikdenchik"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white py-4 sm:py-5 text-base sm:text-lg font-black tracking-wide shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 rounded-b-2xl"
            >
              Купити зараз
            </a>

            {/* ── FEATURE BULLETS ── */}
            <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-1.5 sm:gap-0 mt-4 mb-6 md:mb-0 px-1">
              {[
                "Активація за 5 хвилин",
                "Підходить будь-якому закладу",
                "Дизайн під бренд — безкоштовно",
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5 text-xs sm:text-[11px] text-brand-body font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-brand-accent shrink-0">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Mobile CTA buttons */}
            <div className="flex md:hidden gap-2 mb-8 px-0">
              <a
                href="#contacts"
                className="flex-1 flex items-center justify-center bg-brand-accent hover:bg-brand-accent-hover text-white py-3.5 rounded-full text-sm font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Замовити картку
              </a>
              <a
                href="tel:+380961592377"
                className="flex-1 flex items-center justify-center bg-white text-brand-accent border-2 border-brand-accent py-3.5 rounded-full text-sm font-bold shadow-md transition-all duration-300"
              >
                096 159 23 77
              </a>
            </div>
          </motion.div>

        </div>
      </section>


      {/* The new Menu Section that slides up after the animation finishes */}
      <MenuSection />

      {/* The History Section telling the story of BurgerMax */}
      <HistorySection />

      {/* About Us section describing the values */}
      <AboutSection />

      {/* Reviews Section with Infinite Image Carousel */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
