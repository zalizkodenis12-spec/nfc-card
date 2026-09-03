"use client";

import { motion } from "framer-motion";

export default function HistorySection() {
  return (
    <section id="history" className="relative w-full bg-brand-bg z-10 flex flex-col">
      
      {/* Top Header Banner */}
      <div className="w-full h-[30vh] min-h-[180px] relative bg-brand-bg flex flex-col items-center justify-center overflow-hidden">
        {/* Light background image */}
        <div className="absolute inset-0 opacity-60 bg-[url('/sofa.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/70"></div>
        
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-text relative z-10 text-center mb-3 drop-shadow-sm px-4 whitespace-nowrap">
          Як замовити
        </h2>
        <div className="w-16 h-1 bg-brand-accent relative z-10 mb-3"></div>
        <p className="text-brand-body text-base sm:text-lg font-semibold relative z-10 font-sans text-center px-4">
          3 прості кроки
        </p>
      </div>

      {/* Steps List */}
      <div className="w-full bg-brand-bg flex flex-col py-10 px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="mb-10"
        >
          <span className="text-brand-accent font-bold text-lg tracking-widest uppercase mb-1 block">01</span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-text mb-3 leading-tight">Замовлення</h3>
          <p className="text-base text-brand-body leading-relaxed font-medium">
            Залишаєте заявку на сайті, телефонуєте або пишете в <a href="https://www.instagram.com/denis__zalizko/" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">Instagram</a>, <a href="https://www.tiktok.com/@denis__zalizko" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">TikTok</a> чи <a href="https://t.me/absolutikdenchik" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">Telegram</a>. Обираєте дизайн картки і ми за 2 хвилини погодимо деталі.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="mb-10"
        >
          <span className="text-brand-accent font-bold text-lg tracking-widest uppercase mb-1 block">02</span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-text mb-3 leading-tight">Налаштування та доставка</h3>
          <p className="text-base text-brand-body leading-relaxed font-medium">
            Програмуємо картку під ваш Google-профіль (або обраний тип), перевіряємо що вона працює на будь-якому телефоні, після чого відправляємо Новою поштою чи Укрпоштою.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          className="mb-4"
        >
          <span className="text-brand-accent font-bold text-lg tracking-widest uppercase mb-1 block">03</span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-text mb-3 leading-tight">Готово до роботи</h3>
          <p className="text-base text-brand-body leading-relaxed font-medium">
            Отримуєте посилку, ставите картку на стійку, стіл чи касу. Клієнт прикладає телефон — і сторінка відгуків Google миттєво відкрита.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
