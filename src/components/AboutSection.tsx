import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function AboutSection() {
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
            ЧИСТО • НАДІЙНО • АКУРАТНО • ЧИСТО • НАДІЙНО • АКУРАТНО • 
          </motion.div>
        </div>
        <div className="absolute bottom-1/4 left-0 w-full flex whitespace-nowrap opacity-10 rotate-2 scale-110">
          <motion.div 
            animate={{ x: [-1000, 0] }} 
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="text-[16vw] md:text-[12vw] font-black uppercase tracking-tighter"
          >
            ЧИСТО • НАДІЙНО • АКУРАТНО • ЧИСТО • НАДІЙНО • АКУРАТНО • 
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
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-6 md:mb-8 drop-shadow-sm">Хто ми такі?</h2>
          <p className="text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-8 md:mb-24">
            Ми — команда HardClean, професіонали виїзної хімчистки м'яких меблів у Вінниці. Працюємо з делікатними тканинами, шкірою та оббивкою так, щоб кожен диван, крісло чи матрац були в безпечних руках.
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
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a7.5 7.5 0 0 0 7.5-7.5C19.5 9.141 12 2.25 12 2.25S4.5 9.141 4.5 13.5A7.5 7.5 0 0 0 12 21Z" />
                   </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">Сучасна техніка</h3>
                <p className="text-xl opacity-80 font-medium">Використовуємо потужне обладнання та безпечну хімію для ідеального результату.</p>
              </div>
            </SwiperSlide>
            
            {/* Feature 2 */}
            <SwiperSlide>
              <div className="flex flex-col items-center text-center group h-full cursor-grab active:cursor-grabbing px-2 py-4">
                <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                   </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">Виїзд за адресою</h3>
                <p className="text-xl opacity-80 font-medium">Приїжджаємо самі — вам не потрібно нікуди возити свої меблі.</p>
              </div>
            </SwiperSlide>

            {/* Feature 3 */}
            <SwiperSlide>
              <div className="flex flex-col items-center text-center group h-full cursor-grab active:cursor-grabbing px-2 py-4">
                <div className="w-28 h-28 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 group-hover:bg-white text-white group-hover:text-brand-accent group-hover:border-white transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                   </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">Гарантія результату</h3>
                <p className="text-xl opacity-80 font-medium">Гарантуємо збереження меблів та високу якість виконаної чистки.</p>
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
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a7.5 7.5 0 0 0 7.5-7.5C19.5 9.141 12 2.25 12 2.25S4.5 9.141 4.5 13.5A7.5 7.5 0 0 0 12 21Z" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-serif">Сучасна техніка</h3>
            <p className="text-xl opacity-80 font-medium">Використовуємо потужне обладнання та безпечну хімію для ідеального результату.</p>
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
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-serif">Виїзд за адресою</h3>
            <p className="text-xl opacity-80 font-medium">Приїжджаємо самі — вам не потрібно нікуди возити свої меблі.</p>
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
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
               </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 font-serif">Гарантія результату</h3>
            <p className="text-xl opacity-80 font-medium">Гарантуємо збереження меблів та високу якість виконаної чистки.</p>
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
