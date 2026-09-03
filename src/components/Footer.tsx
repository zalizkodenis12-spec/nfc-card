"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacts" className="relative w-full bg-brand-primary text-white pt-8 pb-12 z-20">
      
      {/* Top Wave Divider pointing up to ReviewsSection */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[calc(100%-1px)] z-20 pointer-events-none">
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

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:grid md:grid-cols-3 md:justify-items-center gap-8 md:gap-10 mt-2">
        
        {/* Logo and brief */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0 md:max-w-[280px]">
          <h2 className="text-6xl font-black text-white tracking-tighter mb-4 md:mb-6 drop-shadow-sm">DWS Cards</h2>
          <p className="text-white text-lg leading-relaxed font-medium">
            DWS Cards — NFC-картки для збору відгуків Google, Instagram та інших платформ. Виготовлення та доставка по всій Україні.
          </p>
        </div>

        {/* Contacts & Socials side-by-side on mobile */}
        <div className="flex flex-row justify-between w-full text-left md:contents">
          {/* Contacts */}
          <div className="flex flex-col items-start w-[48%] md:w-full md:max-w-[300px]">
            <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 font-serif">Контакти</h3>

            {/* Address */}
            <a
              href="https://www.google.com/maps/search/с.+Агрономічне,+вул.+Наукова+9"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 md:gap-3.5 mb-3 md:mb-3.5 text-xs md:text-xl font-semibold text-white hover:text-brand-link-hover transition-colors text-left"
            >
              <div className="w-6 h-6 md:w-7 md:h-7 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <span className="hover:underline">с. Агрономічне, вул. Наукова 9</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+380961592377"
              className="group flex items-center gap-2.5 md:gap-3.5 mb-3 md:mb-3.5 text-xs md:text-xl font-semibold text-white hover:text-brand-link-hover transition-colors"
            >
              <div className="w-6 h-6 md:w-7 md:h-7 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="hover:underline">096 159 23 77</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/absolutikdenchik"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 md:gap-3.5 mb-4 md:mb-6 text-xs md:text-xl font-semibold text-white hover:text-brand-link-hover transition-colors"
            >
              <div className="w-6 h-6 md:w-7 md:h-7 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5 translate-x-[-1px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.694c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.435z" />
                </svg>
              </div>
              <span className="hover:underline">@absolutikdenchik</span>
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-start w-[48%] md:w-full md:max-w-[280px]">
            <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 font-serif">Слідкуй за нами</h3>
            
            <div className="flex flex-col gap-4 md:gap-5 w-full">
              {/* Instagram */}
              <a href="https://www.instagram.com/denis__zalizko/" target="_blank" rel="noreferrer" className="group flex items-center gap-2 md:gap-4 hover:-translate-y-1 transition-transform text-left">
                <div className="w-8 h-8 md:w-14 md:h-14 bg-white text-brand-accent rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow shrink-0">
                  <svg className="w-4 h-4 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <span className="font-black text-[11px] sm:text-xs md:text-xl text-white group-hover:text-brand-link-hover transition-colors">@denis__zalizko</span>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@denis__zalizko" target="_blank" rel="noreferrer" className="group flex items-center gap-2 md:gap-4 hover:-translate-y-1 transition-transform text-left">
                <div className="w-8 h-8 md:w-14 md:h-14 bg-white text-brand-accent rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow shrink-0">
                  <svg className="w-4 h-4 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </div>
                <span className="font-black text-[11px] sm:text-xs md:text-xl text-white group-hover:text-brand-link-hover transition-colors">@denis__zalizko</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center mt-8 md:mt-16 relative z-10 px-6">
        <p className="text-brand-primary font-black text-sm md:text-xl bg-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl inline-block shadow-md text-center tracking-wide">
          Замовлення 24/7
        </p>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 text-center text-white text-sm mt-12 md:mt-16 pt-8 border-t border-white/20 max-w-7xl mx-auto px-6 font-semibold">
        <span>© 2026 DWS Cards. Всі права захищено.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-brand-link-hover hover:underline transition-all">Політика конфіденційності</Link>
          <Link href="/terms-of-use" className="hover:text-brand-link-hover hover:underline transition-all">Умови користування</Link>
        </div>
      </div>
    </footer>
  );
}
