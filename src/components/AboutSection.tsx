"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCardTheme } from "@/context/ThemeContext";

export default function AboutSection() {
  const { currentTheme } = useCardTheme();

  const marqueeText =
    currentTheme.id === "instagram"
      ? "DWS CARDS • INSTAGRAM • ПІДПИСНИКИ • DWS CARDS • INSTAGRAM • "
      : "DWS CARDS • ВІДГУКИ • 5 ЗІРОК • DWS CARDS • ВІДГУКИ • 5 ЗІРОК • ";

  return (
    <section id="about" className="relative w-full bg-brand-primary z-20 pt-16 md:pt-24 pb-16 md:pb-32">
      
      {/* Top Wave Divider pointing up to HistorySection */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[calc(100%-1px)]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px]"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-brand-primary"
          ></path>
        </svg>
      </div>

      {/* Infinite scrolling marquee text in the background (wrapped in overflow-hidden) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none text-white/10">
        <div className="absolute top-1/4 left-0 w-full flex whitespace-nowrap opacity-10 -rotate-2 scale-110">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter"
          >
            {marqueeText}
          </motion.div>
        </div>
        <div className="absolute bottom-1/4 left-0 w-full flex whitespace-nowrap opacity-10 rotate-2 scale-110">
          <motion.div 
            animate={{ x: [-1000, 0] }} 
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter"
          >
            {marqueeText}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-white flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-6 md:mb-8 drop-shadow-sm">Чому це працює?</h2>
          <p className="text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-8 md:mb-24">
            {currentTheme.id === "instagram"
              ? "Клієнти рідко підписуються самі — їм ліньки шукати вас в Instagram чи возитись з QR-кодом. NFC-картка прибирає всі зайві кроки: один дотик — і підписатися простіше, ніж не підписатися."
              : "Клієнти рідко пишуть відгуки самі — їм ліньки шукати вас в Google чи возитись з QR-кодом. NFC-картка прибирає всі зайві кроки: один дотик — і відгук лишити простіше, ніж не лишити."}
          </p>
        </motion.div>

        {/* MOBILE SLIDER VERSION */}
        <div className="md:hidden relative w-full max-w-5xl mx-auto px-4 mt-4">
          {/* Custom Drawn Left Arrow */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer hover:-translate-x-1 transition-transform">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.1))" }}>
                <path d="M60,15 C45,35 35,45 15,50 C35,55 45,65 60,85 M20,50 C40,48 60,52 85,50" />
             </svg>
          </div>
          
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full"
          >
            {/* Feature 1 */}
            <SwiperSlide>
              <div className="flex flex-col items-center text-center group h-full cursor-grab active:cursor-grabbing px-2 py-4">
                <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a2.25 2.25 0 0 1 2.25 2.25M12 6.75a5.25 5.25 0 0 1 5.25 5.25" />
                   </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">Один дотик</h3>
                <p className="text-xl opacity-80 font-medium">Без камери та пошуку посилань. Спрацьовує миттєво на будь-якому смартфоні.</p>
              </div>
            </SwiperSlide>
            
            {/* Feature 2 */}
            <SwiperSlide>
              <div className="flex flex-col items-center text-center group h-full cursor-grab active:cursor-grabbing px-2 py-4">
                <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                   </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif whitespace-nowrap">Преміальний вид</h3>
                <p className="text-xl opacity-80 font-medium">Стильний сучасний аксесуар на стійці чи касі, який підкреслює високий статус вашого бізнесу.</p>
              </div>
            </SwiperSlide>

            {/* Feature 3 */}
            <SwiperSlide>
              <div className="flex flex-col items-center text-center group h-full cursor-grab active:cursor-grabbing px-2 py-4">
                <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                   </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">Працює завжди</h3>
                <p className="text-xl opacity-80 font-medium">На відміну від QR, не залежить від камери, фокусу чи освітлення. Просто підносиш і все.</p>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Custom Drawn Right Arrow */}
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer hover:translate-x-1 transition-transform">
             <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.1))" }}>
                <path d="M40,15 C55,35 65,45 85,50 C65,55 55,65 40,85 M80,50 C60,48 40,52 15,50" />
             </svg>
          </div>
        </div>

        {/* DESKTOP STATIC VERSION */}
        <div className="hidden md:grid md:grid-cols-3 gap-16 w-full px-12 mt-8">
          
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group h-full"
          >
            <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a2.25 2.25 0 0 1 2.25 2.25M12 6.75a5.25 5.25 0 0 1 5.25 5.25" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-serif">Один дотик</h3>
            <p className="text-xl opacity-80 font-medium">Без камери та пошуку посилань. Спрацьовує миттєво на будь-якому смартфоні.</p>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group h-full"
          >
            <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-serif whitespace-nowrap">Преміальний вид</h3>
            <p className="text-xl opacity-80 font-medium">Стильний сучасний аксесуар на стійці чи касі, який підкреслює високий статус вашого бізнесу.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group h-full"
          >
            <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-serif">Працює завжди</h3>
            <p className="text-xl opacity-80 font-medium">На відміну від QR, не залежить від камери, фокусу чи освітлення. Просто підносиш і все.</p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider pointing down to whatever is next */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[calc(100%-1px)] -scale-y-100 z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px]"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-brand-primary"
          ></path>
        </svg>
      </div>
    </section>
  );
}
