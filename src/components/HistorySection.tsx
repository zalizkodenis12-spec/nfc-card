"use client";

import { motion } from "framer-motion";

export default function HistorySection() {
  return (
    <section id="history" className="relative w-full bg-brand-bg z-10 flex flex-col md:flex-row">
      
      {/* Left Side: Header Image (Sticky only on desktop) */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative md:sticky top-0 bg-brand-bg flex flex-col items-center justify-center overflow-hidden">
        {/* Light background image */}
        <div className="absolute inset-0 opacity-60 bg-[url('/sofa.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/70"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-brand-text relative z-10 text-center mb-4 md:mb-6 drop-shadow-sm px-4 whitespace-nowrap">
          Як ми працюємо
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
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4 md:mb-6 leading-tight">Заявка</h3>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed font-medium">
            Телефонуєте нам або надсилаєте фото меблів у Direct <a href="https://www.instagram.com/hard_clean.vinnytsia/" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">Instagram</a>, <a href="https://www.tiktok.com/@hard_clean.vinnytsia" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">TikTok</a> чи <a href="https://www.facebook.com/profile.php?id=61582900071021" target="_blank" rel="noreferrer" className="hover:underline text-brand-accent hover:text-brand-accent-hover transition-colors">Facebook</a> — оцінимо вартість за 2 хвилини. Наш майстер одразу узгодить з вами зручний час виїзду.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="mb-16 md:mb-[25vh]"
        >
          <span className="text-brand-accent font-bold text-xl md:text-2xl tracking-widest uppercase mb-2 md:mb-4 block">02</span>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4 md:mb-6 leading-tight">Виїзд та обробка</h3>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed font-medium">
            Майстер приїжджає до вас з професійним обладнанням та безпечною хімією. Чистимо м'які меблі на місці, без потреби кудись їх везти. Весь процес займає лише кілька годин і не заважає вашому звичайному ритму життя.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="mb-8 md:mb-[10vh]"
        >
          <span className="text-brand-accent font-bold text-xl md:text-2xl tracking-widest uppercase mb-2 md:mb-4 block">03</span>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-text mb-4 md:mb-6 leading-tight">Результат</h3>
          <p className="text-lg md:text-xl text-brand-body leading-relaxed font-medium">
            Після чистки та сушіння меблі виглядають і пахнуть як нові — без плям і запахів. Гарантуємо якість виконаної роботи. Ви знову зможете насолоджуватися бездоганною чистотою та свіжістю свого інтер'єру.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
