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
    <section style={{ maxWidth: "480px", margin: "0 auto", background: "#fff", color: "#000", overflow: "hidden" }}>

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

      {/* Кнопка + залишок */}
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
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#333" }}>
          * залишилось{" "}
          <span style={{ display: "inline-block", background: "#0B2C6B", color: "#fff", padding: "3px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "20px", margin: "0 3px" }}>9</span>
          {" "}штук по акції
        </div>
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

    </section>
  );
}
