"use client";

import { useEffect } from "react";

import MenuSection from "@/components/MenuSection";
import HistorySection from "@/components/HistorySection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative w-full bg-brand-bg">
      <PageIntro />

      {/* === HERO BLOCK === */}
      <HeroSection />

      {/* === BLOCKS === */}
      <MenuSection />
      <HistorySection />
      <AboutSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
