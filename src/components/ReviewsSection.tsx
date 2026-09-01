"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const REVIEWS = [
  {
    name: "Олена К.",
    role: "клієнтка",
    text: "Замовляли чистку дивана, який був весь у плямах — думала, доведеться купувати новий. Майстер приїхав вчасно, акуратно все почистив за пару годин. Після висихання диван виглядає як новий!",
    rating: 5,
  },
  {
    name: "Максим П.",
    role: "клієнт",
    text: "Замовляв чистку дорогого шкіряного крісла і дуже боявся, що його зіпсують. Але все зробили максимально акуратно — повернули ідеальний вигляд та повністю прибрали сторонній запах. Сервісом абсолютно задоволений!",
    rating: 5,
  },
  {
    name: "Марина В.",
    role: "клієнтка",
    text: "Замовляла чистку світлого килима перед святами. Зробили все дуже швидко і, що найголовніше, без зайвого бруду у квартирі. Усі плями відчистилися ідеально, тепер пахне свіжістю. Дуже задоволена!",
    rating: 5,
  },
];

const BURGER_IMAGES = [
  "/chair.jpeg",
  "/chair.jpeg",
  "/chair.jpeg",
  "/chair.jpeg",
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="relative w-full bg-brand-bg z-10 py-16 md:py-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      
      {/* Infinite scrolling images in the background */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex gap-8 opacity-[0.12] pointer-events-none scale-110">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-16 min-w-max items-center"
        >
          {/* Repeat images a few times to ensure infinite scroll */}
          {[...BURGER_IMAGES, ...BURGER_IMAGES, ...BURGER_IMAGES, ...BURGER_IMAGES].map((src, i) => (
            <div key={i} className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-[2rem] md:rounded-[3rem] overflow-hidden drop-shadow-xl shrink-0">
              <img 
                src={src} 
                alt="Background pattern" 
                className={`w-full h-full object-cover transition-transform ${i % 2 !== 0 ? '-scale-x-100' : ''}`} 
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-serif font-bold text-brand-text mb-6 md:mb-8"
          >
            Що кажуть про нас
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-32 h-1.5 bg-brand-accent mx-auto rounded-full"
          ></motion.div>
        </div>

        {/* MOBILE SLIDER VERSION */}
        <div className="md:hidden relative w-full max-w-7xl mx-auto px-4 mt-4">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full"
          >
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full cursor-grab active:cursor-grabbing px-2 py-4">
                  <div className="bg-white border border-brand-primary/10 p-6 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(11,44,107,0.08)] hover:shadow-[0_15px_35px_rgba(11,44,107,0.12)] hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between h-full">
                    <div>
                      <div className="text-brand-star mb-6 md:mb-8 flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-lg md:text-2xl font-medium text-brand-body mb-8 md:mb-12 leading-relaxed italic relative z-10">
                        "{review.text}"
                      </p>
                    </div>
                    
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold font-serif text-brand-text">{review.name}</h4>
                      <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mt-2">{review.role}</p>
                    </div>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP STATIC VERSION */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-12 mt-8">
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white border border-brand-primary/10 p-10 rounded-[3rem] shadow-[0_10px_30px_rgba(11,44,107,0.08)] hover:shadow-[0_15px_35px_rgba(11,44,107,0.12)] hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between h-full"
            >
              <div>
                <div className="text-brand-star mb-8 flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 drop-shadow-sm">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-2xl font-medium text-brand-body mb-12 leading-relaxed italic relative z-10">
                  "{review.text}"
                </p>
              </div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold font-serif text-brand-text">{review.name}</h4>
                <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mt-2">{review.role}</p>
              </div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
