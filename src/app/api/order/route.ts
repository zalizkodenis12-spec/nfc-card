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

    console.log("=== [/api/order] Новий запит на оформлення ===");
    console.log("Дані форми:", { name, telegram, totalPrice, itemsCount: cartItems?.length });

    // 1. Validation for Name (min 2 chars)
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Введіть щонайменше 2 символи в полі Ім'я" },
        { status: 400 }
      );
    }

    // 2. Validation for Telegram (strictly starts with @ and has at least 1 char after)
    const cleanTg = typeof telegram === "string" ? telegram.trim() : "";
    if (!cleanTg.startsWith("@") || cleanTg.length < 2) {
      return NextResponse.json(
        { error: "Вкажіть Telegram у форматі @username" },
        { status: 400 }
      );
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Кошик порожній" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    console.log("Перевірка ENV змінних:");
    console.log("— TELEGRAM_BOT_TOKEN defined:", !!botToken, "Length:", botToken?.length);
    console.log("— TELEGRAM_CHAT_ID defined:", !!chatId, "Value:", chatId);

    if (!botToken || !chatId) {
      const missing: string[] = [];
      if (!botToken) missing.push("TELEGRAM_BOT_TOKEN");
      if (!chatId) missing.push("TELEGRAM_CHAT_ID");
      const errText = `Помилка конфігурації: відсутні змінні оточення (${missing.join(", ")}) на сервері Vercel`;
      console.error(errText);
      return NextResponse.json({ error: errText }, { status: 500 });
    }

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

    console.log(`Відправка запиту до Telegram Bot API...`);

    try {
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
      console.log("Telegram API статус:", tgRes.status, "Відповідь:", JSON.stringify(tgData));

      if (!tgRes.ok || !tgData.ok) {
        const tgErrorDesc = tgData?.description || tgRes.statusText || "Невідома помилка Telegram API";
        console.error("Помилка від Telegram API:", tgErrorDesc);
        return NextResponse.json(
          { error: `Помилка Telegram API: ${tgErrorDesc}` },
          { status: 502 }
        );
      }

      console.log("Успішно відправлено в Telegram!");
      return NextResponse.json({ success: true });
    } catch (fetchErr: any) {
      console.error("Мережева помилка при зверненні до Telegram API:", fetchErr);
      return NextResponse.json(
        { error: `Мережева помилка Telegram API: ${fetchErr.message}` },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("Order API Unhandled Error:", error);
    return NextResponse.json(
      { error: `Внутрішня помилка сервера: ${error?.message || "невідома помилка"}` },
      { status: 500 }
    );
  }
}
