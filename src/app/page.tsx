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
      <div className="relative w-full min-h-[105vh] md:min-h-[130vh] bg-brand-bg z-10 flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/hero-chair.jpeg')] bg-cover bg-[85%_center] md:bg-center bg-no-repeat" />
        {/* Lighten overlay — stronger */}
        <div className="absolute inset-0 bg-white/70" />
        {/* Gradient from left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col items-start mt-[80px] md:mt-0">

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
