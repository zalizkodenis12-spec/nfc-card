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

      {/* Hero Section */}
      <div className="relative w-full min-h-screen bg-brand-bg z-10 flex items-center overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/hero-chair.jpeg')] bg-cover bg-[85%_center] md:bg-center bg-no-repeat" />
        {/* Lighten overlay — stronger */}
        <div className="absolute inset-0 bg-white/70" />
        {/* Gradient from left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-start">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="text-4xl md:text-6xl xl:text-7xl font-serif font-bold text-brand-text leading-tight mb-6 max-w-5xl"
          >
            Більше 5★ відгуків<br />без прохань і<br />незручних розмов
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.0 }}
            className="text-lg md:text-2xl text-brand-body font-medium mb-10 max-w-lg leading-relaxed"
          >
            NFC-картка для бізнесу. Без QR, без камери, без зайвих кліків.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.2 }}
            className="flex flex-row w-full sm:w-auto gap-2 sm:gap-4"
          >
            <a
              href="#contacts"
              className="flex-1 sm:flex-none flex items-center justify-center text-center bg-brand-accent hover:bg-brand-accent-hover text-white px-2 sm:px-12 py-3 sm:py-4 rounded-full text-[13px] sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 leading-tight"
            >
              Замовити картку
            </a>
            <a
              href="tel:+380961592377"
              className="flex-1 sm:flex-none flex items-center justify-center text-center whitespace-nowrap bg-white hover:bg-blue-50/50 text-brand-accent border-2 border-brand-accent px-2 sm:px-12 py-3 sm:py-4 rounded-full text-[13px] sm:text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 leading-tight"
            >
              096 159 23 77
            </a>
          </motion.div>

          {/* МІНІ-БЛОК 1: бейджі переваг */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.4 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-[480px] mt-8 sm:mt-10"
          >
            {/* Badge 1 */}
            <div className="bg-[#F0F6FF] border border-brand-primary/10 rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(11,44,107,0.06)] hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accent mb-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-text leading-tight">
                Доставка 1-3 дні
              </span>
            </div>

            {/* Badge 2 */}
            <div className="bg-[#F0F6FF] border border-brand-primary/10 rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(11,44,107,0.06)] hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accent mb-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-text leading-tight">
                Гарантія 12 місяців
              </span>
            </div>

            {/* Badge 3 */}
            <div className="bg-[#F0F6FF] border border-brand-primary/10 rounded-2xl p-2.5 sm:p-3.5 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(11,44,107,0.06)] hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 text-brand-accent mb-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 2.25 19.5Z" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-text leading-tight">
                Оплата при отриманні
              </span>
            </div>
          </motion.div>

          {/* МІНІ-БЛОК 2: ціна + CTA & МІНІ-БЛОК 3: переваги */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.6 }}
            className="w-full max-w-[480px] bg-brand-primary rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-2xl text-white mt-6 sm:mt-8 relative overflow-hidden border border-white/10"
          >
            {/* Price Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2.5">
                <span className="text-white/60 line-through text-base sm:text-lg font-semibold">
                  799 грн
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-white tracking-tight drop-shadow-sm">
                  499 грн
                </span>
              </div>
              <span className="bg-brand-accent/40 border border-brand-accent/60 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                Акція
              </span>
            </div>

            {/* Buy CTA Button */}
            <a
              href="https://t.me/absolutikdenchik"
              target="_blank"
              rel="noreferrer"
              className="w-full mt-4 flex items-center justify-center text-center bg-brand-accent hover:bg-brand-accent-hover text-white py-3.5 sm:py-4 px-6 rounded-full text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 leading-tight"
            >
              Купити зараз
            </a>

            {/* МІНІ-БЛОК 3: 3 короткі переваги з галочками */}
            <div className="mt-5 pt-4 border-t border-white/15 flex flex-col gap-2 text-xs sm:text-sm font-medium text-white/90">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-star shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                <span>Активація за 5 хвилин</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-star shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                <span>Підходить під будь-який заклад</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-star shrink-0">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                <span>Дизайн під ваш бренд безкоштовно</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
