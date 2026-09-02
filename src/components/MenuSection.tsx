"use client";

import { motion } from "framer-motion";

const SERVICES = [
  { id: 1, name: "NFC-картка з програмуванням" },
  { id: 2, name: "Безстрокова дія без абонплат" },
  { id: 3, name: "Налаштування під ваш Google-профіль" },
  { id: 4, name: "Дизайн картки під бренд закладу" },
];

export default function MenuSection() {
  return (
    <section id="menu" className="relative w-full bg-brand-primary z-20 pb-32">
      {/* Top Smoother Wavy SVG Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[calc(100%-1px)]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px] md:h-[150px]"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-brand-primary"
          ></path>
        </svg>
      </div>

      {/* Decorative Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-brand-primary-dark opacity-35"></div>
        <div className="absolute top-[20%] right-[5%] w-64 h-64 rounded-full bg-brand-primary-dark opacity-30"></div>
        <div className="absolute top-[40%] left-[2%] w-48 h-48 rounded-full bg-brand-primary-dark opacity-35"></div>
        <div className="absolute top-[60%] right-[15%] w-80 h-80 rounded-full bg-brand-primary-dark opacity-30"></div>
        <div className="absolute bottom-[10%] left-[20%] w-96 h-96 rounded-full bg-brand-primary-dark opacity-35"></div>
        <div className="absolute bottom-[30%] right-[2%] w-40 h-40 rounded-full bg-brand-primary-dark opacity-30"></div>
        <div className="absolute top-[5%] left-[50%] w-24 h-24 rounded-full bg-brand-primary-dark opacity-35"></div>
        <div className="absolute top-[80%] left-[5%] w-72 h-72 rounded-full bg-brand-primary-dark opacity-30"></div>
        <div className="absolute top-[35%] right-[40%] w-56 h-56 rounded-full bg-brand-primary-dark opacity-35"></div>
        <div className="absolute bottom-[5%] right-[45%] w-48 h-48 rounded-full bg-brand-primary-dark opacity-30"></div>
        <div className="absolute top-[15%] left-[80%] w-32 h-32 rounded-full bg-brand-primary-dark opacity-35"></div>
        <div className="absolute bottom-[50%] left-[40%] w-64 h-64 rounded-full bg-brand-primary-dark opacity-30"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 text-center relative z-10">

        {/* Animated heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-8xl font-extrabold text-white mb-12 md:mb-16 tracking-wide drop-shadow-md"
        >
          Що входить у комплект DWS Cards
        </motion.h2>

        {/* 2 columns grid for both mobile and desktop */}
        <div className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-12 md:gap-y-16">
          {SERVICES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group flex flex-col items-center"
            >
              {/* Light blue placeholder */}
              <div className="w-full aspect-square bg-white rounded-3xl shadow-lg mb-4 md:mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl">
              </div>

              {/* Text Info */}
              <h3 className="text-sm sm:text-lg md:text-4xl font-bold text-white transition-colors leading-tight text-center px-1">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Smoother Wavy SVG Divider (Flipped Vertically) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[calc(100%-1px)] -scale-y-100 z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px] md:h-[150px]"
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
