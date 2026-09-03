import { NextResponse } from "next/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, telegram, comment, cartItems, totalPrice } = body;

    // Backend validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Будь ласка, введіть коректне ім'я" },
        { status: 400 }
      );
    }

    const cleanTg = typeof telegram === "string" ? telegram.trim() : "";
    const isTgValid =
      cleanTg.startsWith("@") ||
      cleanTg.includes("t.me/") ||
      /^https?:\/\/t\.me\//.test(cleanTg);

    if (!cleanTg || !isTgValid || cleanTg.length < 3) {
      return NextResponse.json(
        { error: "Введіть коректний нікнейм або посилання на Telegram" },
        { status: 400 }
      );
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Кошик порожній" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Format Kyiv date/time: DD.MM.YY, HH:MM:SS
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("uk-UA", {
      timeZone: "Europe/Kyiv",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);

    const itemsText = cartItems
      .map((item: { name: string; qty: number; price: number }) => {
        const itemTotal = (item.price || 0) * (item.qty || 1);
        return `— ${escapeHtml(item.name)} × ${item.qty} шт — ${itemTotal} грн`;
      })
      .join("\n");

    const messageText = `🚀 <b>НОВА ЗАЯВКА З САЙТУ DWS Cards!</b>\n\n👤 <b>Клієнт:</b> ${escapeHtml(
      name.trim()
    )}\n💬 <b>Telegram:</b> ${escapeHtml(
      cleanTg
    )}\n🛒 <b>Замовлення:</b>\n${itemsText}\n💰 <b>Разом:</b> ${totalPrice} грн\n📝 <b>Побажання:</b> ${
      comment?.trim() ? escapeHtml(comment.trim()) : "не вказано"
    }\n\n🕐 <b>Дата та час:</b> ${formattedDate}`;

    if (!botToken || !chatId) {
      console.warn(
        "TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не налаштовано в .env. Замовлення збережено в логах:",
        { name, telegram: cleanTg, totalPrice, cartItems }
      );
      // Return success in case variables are not yet configured on host so user isn't blocked
      return NextResponse.json({
        success: true,
        warning: "Telegram credentials missing in environment variables",
      });
    }

    const tgRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      }
    );

    const tgData = await tgRes.json();

    if (!tgRes.ok || !tgData.ok) {
      console.error("Telegram API Error:", tgData);
      return NextResponse.json(
        { error: "Помилка зв'язку з сервером Telegram" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера при оформленні замовлення" },
      { status: 500 }
    );
  }
}
