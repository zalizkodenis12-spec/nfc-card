"use client";

import { motion } from "framer-motion";
import { useCardTheme } from "@/context/ThemeContext";

export default function HistorySection() {
  const { currentTheme } = useCardTheme();

  return (
    <section id="history" className="relative w-full bg-brand-bg z-10 flex flex-col md:flex-row">
      
      {/* Left Side: Header Image (Sticky only on desktop) */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative md:sticky top-0 bg-brand-bg flex flex-col items-center justify-center overflow-hidden">
        {/* Light background image */}
        <div
          className="absolute inset-0 opacity-60 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url(${
              currentTheme.id === "instagram"
                ? "/how-to-order-instagram.jpeg"
                : "/how-to-order-google.jpeg"
            })`,
          }}
        ></div>
        <div className="absolute inset-0 bg-white/70"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-brand-text relative z-10 text-center mb-4 md:mb-6 drop-shadow-sm px-4 whitespace-nowrap">
          Як замовити
        </h2>
        <div className="w-16 md:w-24 h-1 bg-brand-accent relative z-10 mb-4 md:mb-6"></div>
        <p className="text-brand-body text-lg md:text-2xl font-medium relative z-10 font-sans text-center px-8">
          3 прості кроки
        </p>
      </div>

      {/* Right Side: Scrolling Content */}
      <div className="w-full md:w-1/2 bg-brand-bg flex flex-col py-16 md:py-[20vh] px-6 md:px-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="mb-16 md:mb-[25vh]"
        >
          <span className="text-brand-accent font-bold text-xl md:text-2xl tracking-widest uppercase mb-2 md:mb-4 block">01</span>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4 md:mb-6 leading-tight">Замовлення</h3>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed font-medium">
            Залишаєте заявку на сайті, телефонуєте або пишете в <a href="https://www.instagram.com/denis__zalizko/" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">Instagram</a>, <a href="https://www.tiktok.com/@denis__zalizko" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">TikTok</a> чи <a href="https://t.me/absolutikdenchik" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">Telegram</a>. Обираєте дизайн картки і ми за 2 хвилини погодимо деталі.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="mb-16 md:mb-[25vh]"
        >
          <span className="text-brand-accent font-bold text-xl md:text-2xl tracking-widest uppercase mb-2 md:mb-4 block">02</span>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4 md:mb-6 leading-tight">Налаштування та доставка</h3>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed font-medium">
            {currentTheme.id === "instagram"
              ? "Програмуємо картку під ваш Instagram-акаунт (або обраний тип), перевіряємо що вона працює на будь-якому телефоні, після чого відправляємо Новою поштою чи Укрпоштою."
              : "Програмуємо картку під ваш Google-профіль (або обраний тип), перевіряємо що вона працює на будь-якому телефоні, після чого відправляємо Новою поштою чи Укрпоштою."}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="mb-8 md:mb-[10vh]"
        >
          <span className="text-brand-accent font-bold text-xl md:text-2xl tracking-widest uppercase mb-2 md:mb-4 block">03</span>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4 md:mb-6 leading-tight">Готово до роботи</h3>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed font-medium">
            {currentTheme.id === "instagram"
              ? "Ставите картку на стійці або касі. Клієнт підносить телефон — і за секунду вже на вашій Instagram-сторінці."
              : "Ставите картку на стійці або касі. Клієнт підносить телефон — і за секунду вже на сторінці відгуку."}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
