"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCardTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const { addItem, openCart } = useCart();
  const { currentTheme, nextTheme, prevTheme } = useCardTheme();

  const handleBuyNow = () => {
    addItem(
      {
        id: currentTheme.productId,
        name: currentTheme.productName,
        image: currentTheme.cardImage,
        basePrice: 499,
      },
      1
    );
    openCart();
  };

  return (
    <section className="w-full bg-white">

      {/* ─────────────────────────────────────────────────────────────
          📱 МОБІЛЬНА ВЕРСІЯ (лише для екранів < 768px, 100% незмінна)
          ───────────────────────────────────────────────────────────── */}
      <div className="block md:hidden" style={{ maxWidth: "480px", margin: "0 auto", background: "#fff", color: "#000", overflow: "hidden" }}>

        {/* Заголовок */}
        <div style={{ background: "var(--theme-primary)", color: "#fff", textAlign: "center", padding: "25px 10px", transition: "background-color 400ms ease" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 900, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "inherit" }}>
            {currentTheme.headlinePrefix}
          </h1>
          <h2 style={{ fontSize: "22px", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "inherit" }}>
            {currentTheme.subheadlinePrefix}{" "}
            <span style={{ color: currentTheme.highlightColor }}>
              {currentTheme.subheadlineHighlight}
            </span>
          </h2>
        </div>

        {/* Фото товару з безкінечною каруселлю стрілочок */}
        <div className="relative w-full overflow-hidden bg-gray-50 flex items-center justify-center select-none" style={{ minHeight: "360px" }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTheme.id}
              src={currentTheme.cardImage}
              alt={currentTheme.productName}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
          </AnimatePresence>

          {/* Ліва кругла стрілочка */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevTheme();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 hover:bg-white active:scale-95 backdrop-blur-md shadow-lg flex items-center justify-center transition-all cursor-pointer border border-white/70"
            style={{ color: "var(--theme-primary)" }}
            aria-label="Попередня картка"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Права кругла стрілочка */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextTheme();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 hover:bg-white active:scale-95 backdrop-blur-md shadow-lg flex items-center justify-center transition-all cursor-pointer border border-white/70"
            style={{ color: "var(--theme-primary)" }}
            aria-label="Наступна картка"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Смуга переваг */}
        <div style={{ display: "flex", background: "var(--theme-primary)", color: "#fff", padding: "15px 5px", justifyContent: "space-between", transition: "background-color 400ms ease" }}>
          {[
            { label: "Створення\nза 2-3 дні" },
            { label: "Знижки на\nоптові замовлення" },
            { label: "Оплата при\nотриманні" },
          ].map(({ label }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", fontSize: "13px", lineHeight: 1.2, flex: 1, justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "22px", height: "22px", marginRight: "6px", flexShrink: 0 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span style={{ whiteSpace: "pre-line" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Блок цін */}
        <div style={{ display: "flex", position: "relative", background: "#fff", marginTop: "15px" }}>
          <div style={{ width: "60%", padding: "20px 55px 20px 5px", textAlign: "center", background: "#fff" }}>
            <span style={{ display: "block", fontSize: "18px", marginBottom: "5px", color: "var(--theme-primary)", fontWeight: 600, transition: "color 400ms ease" }}>Стара ціна:</span>
            <span style={{ display: "block", fontSize: "34px", fontWeight: 900, textDecoration: "line-through", color: "var(--theme-primary)", transition: "color 400ms ease" }}>799 грн</span>
          </div>
          <div style={{ width: "55%", background: "var(--theme-primary)", color: "#fff", padding: "20px 10px", paddingLeft: "10%", textAlign: "center", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", marginLeft: "-15%", position: "relative", zIndex: 1, transition: "background-color 400ms ease" }}>
            <span style={{ display: "block", fontSize: "18px", marginBottom: "5px" }}>Акційна ціна:</span>
            <span style={{ display: "block", fontSize: "36px", fontWeight: 900 }}>499 грн</span>
          </div>
        </div>

        {/* Кнопка */}
        <div style={{ padding: "25px 20px 0" }}>
          <button
            type="button"
            onClick={handleBuyNow}
            style={{
              display: "block",
              width: "100%",
              background: "var(--theme-primary)",
              color: "#fff",
              padding: "22px",
              fontSize: "24px",
              fontWeight: 900,
              borderRadius: "8px",
              textAlign: "center",
              textDecoration: "none",
              textTransform: "uppercase",
              cursor: "pointer",
              border: "none",
              transition: "background-color 400ms ease, transform 0.15s ease",
            }}
          >
            КУПИТИ ЗАРАЗ
          </button>
        </div>

        {/* Буліти */}
        <div style={{ padding: "25px 20px 40px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {currentTheme.bullets.map((text, i) => (
              <li key={i} style={{ position: "relative", paddingLeft: "45px", marginBottom: "20px", fontSize: "17px", lineHeight: 1.3, color: "#000", minHeight: "32px", display: "flex", alignItems: "center" }}>
                <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "30px", height: "30px", background: "var(--theme-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", transition: "background-color 400ms ease" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px" }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          💻 КОМП'ЮТЕРНА ВЕРСІЯ (широка, адаптована, оптимізована по висоті)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:block w-full bg-white text-black overflow-hidden">

        {/* Заголовок — на 100% ширини монітора */}
        <div className="w-full text-white text-center py-10 px-4 transition-colors duration-400" style={{ background: "var(--theme-primary)" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 900, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "inherit" }}>
            {currentTheme.headlinePrefix}
          </h1>
          <h2 style={{ fontSize: "32px", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "inherit" }}>
            {currentTheme.subheadlinePrefix}{" "}
            <span style={{ color: currentTheme.highlightColor }}>
              {currentTheme.subheadlineHighlight}
            </span>
          </h2>
        </div>

        {/* Фото товару — розтягнуто на всю ширину, але коротше по висоті, з фокусом на картці по центру */}
        <div className="w-full h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden relative bg-gray-50 flex items-center justify-center select-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTheme.id}
              src={currentTheme.cardImage}
              alt={currentTheme.productName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full object-cover block"
              style={{ objectPosition: "center 42%" }}
            />
          </AnimatePresence>

          {/* Ліва кругла кнопка-стрілочка (desktop) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevTheme();
            }}
            className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/85 hover:bg-white hover:scale-105 active:scale-95 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all cursor-pointer border border-white/80 group/btn"
            style={{ color: "var(--theme-primary)" }}
            aria-label="Попередня картка"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 group-hover/btn:-translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Права кругла кнопка-стрілочка (desktop) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextTheme();
            }}
            className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/85 hover:bg-white hover:scale-105 active:scale-95 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all cursor-pointer border border-white/80 group/btn"
            style={{ color: "var(--theme-primary)" }}
            aria-label="Наступна картка"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 group-hover/btn:translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Смуга переваг — на 100% ширини монітора, збільшені написи */}
        <div className="w-full text-white py-8 px-8 shadow-inner transition-colors duration-400" style={{ background: "var(--theme-primary)" }}>
          <div className="max-w-6xl mx-auto flex justify-between items-center gap-6">
            {[
              { label: "Створення\nза 2-3 дні" },
              { label: "Знижки на\nоптові замовлення" },
              { label: "Оплата при\nотриманні" },
            ].map(({ label }, i) => (
              <div key={i} className="flex items-center justify-center flex-1 text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 lg:w-11 lg:h-11 mr-4 shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <span className="text-lg lg:text-2xl font-bold whitespace-pre-line text-left leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Нижня частина блоку — розширена, збільшена, масивна */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4">

          {/* Блок цін — широкий, великі солідні шрифти */}
          <div style={{ display: "flex", position: "relative", background: "#fff", marginTop: "35px" }}>
            <div style={{ width: "60%", padding: "32px 85px 32px 30px", textAlign: "center", background: "#fff" }}>
              <span style={{ display: "block", fontSize: "26px", marginBottom: "8px", color: "var(--theme-primary)", fontWeight: 700, transition: "color 400ms ease" }}>Стара ціна:</span>
              <span style={{ display: "block", fontSize: "52px", fontWeight: 900, textDecoration: "line-through", color: "var(--theme-primary)", transition: "color 400ms ease" }}>799 грн</span>
            </div>
            <div style={{ width: "55%", background: "var(--theme-primary)", color: "#fff", padding: "32px 30px", paddingLeft: "12%", textAlign: "center", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", marginLeft: "-15%", position: "relative", zIndex: 1, transition: "background-color 400ms ease" }}>
              <span style={{ display: "block", fontSize: "26px", marginBottom: "8px", fontWeight: 700 }}>Акційна ціна:</span>
              <span style={{ display: "block", fontSize: "56px", fontWeight: 900 }}>499 грн</span>
            </div>
          </div>

          {/* Кнопка «КУПИТИ ЗАРАЗ» — розширена на всю ширину блока */}
          <div style={{ padding: "35px 0 0" }}>
            <button
              type="button"
              onClick={handleBuyNow}
              style={{
                display: "block",
                width: "100%",
                background: "var(--theme-primary)",
                color: "#fff",
                padding: "30px 20px",
                fontSize: "32px",
                fontWeight: 900,
                borderRadius: "14px",
                textAlign: "center",
                textDecoration: "none",
                textTransform: "uppercase",
                cursor: "pointer",
                border: "none",
                letterSpacing: "1px",
                boxShadow: "0 12px 30px -5px rgba(0, 0, 0, 0.25)",
                transition: "transform 0.15s ease, background-color 400ms ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "var(--theme-primary-dark)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "var(--theme-primary)")}
            >
              КУПИТИ ЗАРАЗ
            </button>
          </div>

          {/* Буліти — збільшені, комфортна ширина й читабельність */}
          <div style={{ padding: "45px 15px 70px" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {currentTheme.bullets.map((text, i) => (
                <li key={i} style={{ position: "relative", paddingLeft: "65px", marginBottom: "28px", fontSize: "23px", lineHeight: 1.4, color: "#111", minHeight: "44px", display: "flex", alignItems: "center", fontWeight: 700 }}>
                  <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", background: "var(--theme-primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", transition: "background-color 400ms ease" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </section>
  );
}

