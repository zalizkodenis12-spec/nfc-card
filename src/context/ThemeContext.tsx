"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CardTheme {
  id: "google" | "instagram" | "dws";
  enabled?: boolean;
  name: string;
  cardImage: string;
  headlinePrefix: string;
  subheadlinePrefix: string;
  subheadlineHighlight: string;
  highlightColor: string;
  bullets: string[];
  productId: string;
  productName: string;
  oldPrice: string;
  price: string;
  priceNote?: string;
  basePriceNum: number;
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

export const ALL_CARD_THEMES: CardTheme[] = [
  {
    id: "google",
    enabled: true,
    name: "Google Maps",
    cardImage: "/nfc-card.jpg",
    headlinePrefix: "NFC-КАРТКА ДЛЯ БІЗНЕСУ",
    subheadlinePrefix: "БІЛЬШЕ",
    subheadlineHighlight: "5★ ВІДГУКІВ",
    highlightColor: "#FBBC04",
    bullets: [
      "Один дотик — і клієнт на сторінці відгуків Google",
      "Без камери, без QR та зайвих кроків",
      "Підходить для будь-якого закладу та смартфона",
    ],
    productId: "nfc-card-google-maps",
    productName: "NFC-картка Google Maps",
    oldPrice: "699 грн",
    price: "399 грн",
    basePriceNum: 399,
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
    // 🟠 Тимчасово відключено за запитом (можна в будь-який момент повернути на true)
    enabled: false,
    name: "Instagram",
    cardImage: "/instagram-card.jpg",
    headlinePrefix: "NFC-КАРТКА ДЛЯ БІЗНЕСУ",
    subheadlinePrefix: "БІЛЬШЕ",
    subheadlineHighlight: "ПІДПИСНИКІВ В INSTAGRAM",
    highlightColor: "#FFC107",
    bullets: [
      "Один дотик — і клієнт у вашому Instagram",
      "Без камери, без QR та зайвих кроків",
      "Підходить для будь-якого закладу та смартфона",
    ],
    productId: "nfc-card-instagram",
    productName: "NFC-картка Instagram",
    oldPrice: "699 грн",
    price: "399 грн",
    basePriceNum: 399,
    colors: {
      primary: "#D9531E", // Чуть-чуть світліший, свіжий соковитий оранжевий
      primaryDark: "#B84010",
      accent: "#F06424",
      accentHover: "#D9531E",
      linkHover: "#FED7AA",
      light: "#FFF8F2",
      lightBorder: "rgba(217, 83, 30, 0.25)",
    },
  },
  {
    id: "dws",
    enabled: true,
    name: "Власний дизайн",
    cardImage: "/dws-card.jpg",
    headlinePrefix: "NFC-КАРТКА ДЛЯ БІЗНЕСУ",
    subheadlinePrefix: "З ВАШИМ",
    subheadlineHighlight: "ВЛАСНИМ ДИЗАЙНОМ",
    highlightColor: "#38BDF8",
    bullets: [
      "Картка з вашим логотипом, кольорами та стилем",
      "Програмуємо під TikTok, сайт, меню, Telegram чи будь-яке посилання",
      "Без камери та QR — спрацьовує в один дотик на будь-якому смартфоні",
    ],
    productId: "nfc-card-dws",
    productName: "NFC-картка з власним дизайном",
    oldPrice: "699 грн",
    price: "від 399 грн",
    priceNote: "Індивідуальний прорахунок складності дизайну та великих тиражів",
    basePriceNum: 399,
    colors: {
      primary: "#1E293B", // Преміальний темний графіт / Slate
      primaryDark: "#0F172A",
      accent: "#0284C7", // Фірмовий кобальтовий синій колір DenisWebStudio
      accentHover: "#0369A1",
      linkHover: "#7DD3FC",
      light: "#F0F9FF",
      lightBorder: "rgba(30, 41, 59, 0.25)",
    },
  },
];

// Відображаються лише активні картки (зараз Google Maps та Власний дизайн)
export const CARD_THEMES: CardTheme[] = ALL_CARD_THEMES.filter(
  (t) => t.enabled !== false
);

interface CardThemeContextType {
  activeThemeIndex: number;
  currentTheme: CardTheme;
  nextTheme: () => void;
  prevTheme: () => void;
  setThemeById: (id: "google" | "instagram" | "dws") => void;
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

  const setThemeById = (id: "google" | "instagram" | "dws") => {
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
