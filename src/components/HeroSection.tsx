"use client";

export default function HeroSection() {
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
          { label: "Доставка\nза 1-3 дні" },
          { label: "Гарантія\n12 місяців" },
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
        <div style={{ width: "60%", padding: "20px 10px", textAlign: "center", background: "#fff" }}>
          <span style={{ display: "block", fontSize: "18px", marginBottom: "5px" }}>Стара ціна:</span>
          <span style={{ display: "block", fontSize: "34px", fontWeight: 900, textDecoration: "line-through", color: "#999" }}>799 грн</span>
        </div>
        <div style={{ width: "55%", background: "#0B2C6B", color: "#fff", padding: "20px 10px", paddingLeft: "10%", textAlign: "center", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", marginLeft: "-15%", position: "relative", zIndex: 1 }}>
          <span style={{ display: "block", fontSize: "18px", marginBottom: "5px" }}>Акційна ціна:</span>
          <span style={{ display: "block", fontSize: "36px", fontWeight: 900 }}>499 грн</span>
        </div>
      </div>

      {/* Кнопка + залишок */}
      <div style={{ padding: "25px 20px 35px" }}>
        <a href="https://t.me/absolutikdenchik" target="_blank" rel="noreferrer" style={{ display: "block", width: "100%", background: "#1256B8", color: "#fff", padding: "22px", fontSize: "24px", fontWeight: 900, borderRadius: "8px", textAlign: "center", textDecoration: "none", textTransform: "uppercase" }}>
          КУПИТИ ЗАРАЗ
        </a>
        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#333" }}>
          * залишилось{" "}
          <span style={{ display: "inline-block", background: "#0B2C6B", color: "#fff", padding: "3px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "20px", margin: "0 3px" }}>9</span>
          {" "}штук по акції
        </div>
      </div>

    </section>
  );
}
