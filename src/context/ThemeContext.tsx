"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CardTheme {
  id: "google" | "instagram";
  name: string;
  cardImage: string;
  headlinePrefix: string;
  subheadlinePrefix: string;
  subheadlineHighlight: string;
  productId: string;
  productName: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    accentHover: string;
    linkHover: string;
    light: string;
    lightBorder: string;
  };
}

export const CARD_THEMES: CardTheme[] = [
  {
    id: "google",
    name: "Google Maps",
    cardImage: "/nfc-card.jpg",
    headlinePrefix: "NFC-КАРТКА ДЛЯ БІЗНЕСУ",
    subheadlinePrefix: "БІЛЬШЕ",
    subheadlineHighlight: "5★ ВІДГУКІВ",
    productId: "nfc-card-google-maps",
    productName: "NFC-картка Google Maps",
    colors: {
      primary: "#0B2C6B",
      primaryDark: "#071F4C",
      accent: "#1256B8",
      accentHover: "#093F8C",
      linkHover: "#7CA7F0",
      light: "#F0F5FF",
      lightBorder: "rgba(11, 44, 107, 0.2)",
    },
  },
  {
    id: "instagram",
    name: "Instagram",
    cardImage: "/instagram-card.jpg",
    headlinePrefix: "NFC-КАРТКА ДЛЯ БІЗНЕСУ",
    subheadlinePrefix: "БІЛЬШЕ",
    subheadlineHighlight: "ПІДПИСНИКІВ В INSTAGRAM",
    productId: "nfc-card-instagram",
    productName: "NFC-картка Instagram",
    colors: {
      primary: "#C2410C",
      primaryDark: "#9A3412",
      accent: "#EA580C",
      accentHover: "#C2410C",
      linkHover: "#FDBA74",
      light: "#FFF7ED",
      lightBorder: "rgba(194, 65, 12, 0.2)",
    },
  },
];

interface CardThemeContextType {
  activeThemeIndex: number;
  currentTheme: CardTheme;
  nextTheme: () => void;
  prevTheme: () => void;
  setThemeById: (id: "google" | "instagram") => void;
}

const CardThemeContext = createContext<CardThemeContextType | undefined>(undefined);

export function CardThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const currentTheme = CARD_THEMES[activeThemeIndex];

  // Infinite carousel handlers
  const nextTheme = () => {
    setActiveThemeIndex((prev) => (prev + 1) % CARD_THEMES.length);
  };

  const prevTheme = () => {
    setActiveThemeIndex((prev) => (prev - 1 + CARD_THEMES.length) % CARD_THEMES.length);
  };

  const setThemeById = (id: "google" | "instagram") => {
    const idx = CARD_THEMES.findIndex((t) => t.id === id);
    if (idx !== -1) setActiveThemeIndex(idx);
  };

  // Sync CSS custom properties with current theme
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", currentTheme.colors.primary);
    root.style.setProperty("--theme-primary-dark", currentTheme.colors.primaryDark);
    root.style.setProperty("--theme-accent", currentTheme.colors.accent);
    root.style.setProperty("--theme-accent-hover", currentTheme.colors.accentHover);
    root.style.setProperty("--theme-link-hover", currentTheme.colors.linkHover);
    root.style.setProperty("--theme-light", currentTheme.colors.light);
    root.style.setProperty("--theme-light-border", currentTheme.colors.lightBorder);
  }, [currentTheme]);

  return (
    <CardThemeContext.Provider
      value={{
        activeThemeIndex,
        currentTheme,
        nextTheme,
        prevTheme,
        setThemeById,
      }}
    >
      {children}
    </CardThemeContext.Provider>
  );
}

export function useCardTheme() {
  const context = useContext(CardThemeContext);
  if (!context) {
    throw new Error("useCardTheme must be used within a CardThemeProvider");
  }
  return context;
}
