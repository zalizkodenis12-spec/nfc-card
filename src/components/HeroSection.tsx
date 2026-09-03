"use client";

import { useCart } from "@/context/CartContext";

export default function HeroSection() {
  const { addItem, openCart } = useCart();

  const handleBuyNow = () => {
    addItem(
      {
        id: "nfc-card-google-maps",
        name: "NFC-картка Google Maps",
        image: "/nfc-card.jpg",
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
        <div style={{ background: "#0B2C6B", color: "#fff", textAlign: "center", padding: "25px 10px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 900, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "inherit" }}>
            NFC-КАРТКА ДЛЯ БІЗНЕСУ
          </h1>
          <h2 style={{ fontSize: "22px", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "inherit" }}>
            БІЛЬШЕ <span style={{ color: "#FBBC04" }}>5★ ВІДГУКІВ</span>
          </h2>
        </div>

        {/* Фото товару */}
        <div style={{ width: "100%" }}>
          <img src="/nfc-card.jpg" alt="DWS Cards NFC картка" style={{ width: "100%", display: "block", objectFit: "cover" }} />
        </div>

        {/* Смуга переваг */}
        <div style={{ display: "flex", background: "#0B2C6B", color: "#fff", padding: "15px 5px", justifyContent: "space-between" }}>
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
            <span style={{ display: "block", fontSize: "18px", marginBottom: "5px", color: "#0B2C6B", fontWeight: 600 }}>Стара ціна:</span>
            <span style={{ display: "block", fontSize: "34px", fontWeight: 900, textDecoration: "line-through", color: "#0B2C6B" }}>799 грн</span>
          </div>
          <div style={{ width: "55%", background: "#0B2C6B", color: "#fff", padding: "20px 10px", paddingLeft: "10%", textAlign: "center", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", marginLeft: "-15%", position: "relative", zIndex: 1 }}>
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
              background: "#0B2C6B",
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
            }}
          >
            КУПИТИ ЗАРАЗ
          </button>
        </div>

        {/* Буліти */}
        <div style={{ padding: "25px 20px 40px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              "Один дотик — і клієнт на сторінці відгуків Google",
              "Без камери, без QR та зайвих кроків",
              "Підходить для будь-якого закладу та смартфона",
            ].map((text, i) => (
              <li key={i} style={{ position: "relative", paddingLeft: "45px", marginBottom: "20px", fontSize: "17px", lineHeight: 1.3, color: "#000", minHeight: "32px", display: "flex", alignItems: "center" }}>
                <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "30px", height: "30px", background: "#0B2C6B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px" }}>
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
        <div className="w-full bg-[#0B2C6B] text-white text-center py-10 px-4">
          <h1 style={{ fontSize: "40px", fontWeight: 900, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "inherit" }}>
            NFC-КАРТКА ДЛЯ БІЗНЕСУ
          </h1>
          <h2 style={{ fontSize: "32px", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "1px", fontFamily: "inherit" }}>
            БІЛЬШЕ <span style={{ color: "#FBBC04" }}>5★ ВІДГУКІВ</span>
          </h2>
        </div>

        {/* Фото товару — розтягнуто на всю ширину, але коротше по висоті, з фокусом на картці по центру */}
        <div className="w-full h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden relative bg-gray-50 flex items-center justify-center">
          <img
            src="/nfc-card.jpg"
            alt="DWS Cards NFC картка"
            className="w-full h-full object-cover block"
            style={{ objectPosition: "center 42%" }}
          />
        </div>

        {/* Смуга переваг — на 100% ширини монітора, збільшені написи */}
        <div className="w-full bg-[#0B2C6B] text-white py-8 px-8 shadow-inner">
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
              <span style={{ display: "block", fontSize: "26px", marginBottom: "8px", color: "#0B2C6B", fontWeight: 700 }}>Стара ціна:</span>
              <span style={{ display: "block", fontSize: "52px", fontWeight: 900, textDecoration: "line-through", color: "#0B2C6B" }}>799 грн</span>
            </div>
            <div style={{ width: "55%", background: "#0B2C6B", color: "#fff", padding: "32px 30px", paddingLeft: "12%", textAlign: "center", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", marginLeft: "-15%", position: "relative", zIndex: 1 }}>
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
                background: "#0B2C6B",
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
                boxShadow: "0 12px 30px -5px rgba(11, 44, 107, 0.35)",
                transition: "transform 0.15s ease, background 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#071F4C")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#0B2C6B")}
            >
              КУПИТИ ЗАРАЗ
            </button>
          </div>

          {/* Буліти — збільшені, комфортна ширина й читабельність */}
          <div style={{ padding: "45px 15px 70px" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Один дотик — і клієнт на сторінці відгуків Google",
                "Без камери, без QR та зайвих кроків",
                "Підходить для будь-якого закладу та смартфона",
              ].map((text, i) => (
                <li key={i} style={{ position: "relative", paddingLeft: "65px", marginBottom: "28px", fontSize: "23px", lineHeight: 1.4, color: "#111", minHeight: "44px", display: "flex", alignItems: "center", fontWeight: 700 }}>
                  <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", background: "#0B2C6B", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px" }}>
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
