import { NextResponse } from "next/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    let name = "";
    let telegram = "";
    let comment = "";
    let cartItems: any[] = [];
    let totalPrice = 0;
    let photos: File[] = [];

    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = (formData.get("name") as string) || "";
      telegram = (formData.get("telegram") as string) || "";
      comment = (formData.get("comment") as string) || "";
      totalPrice = Number(formData.get("totalPrice")) || 0;
      const rawCart = formData.get("cartItems") as string;
      if (rawCart) {
        try {
          cartItems = JSON.parse(rawCart);
        } catch {
          cartItems = [];
        }
      }
      photos = (formData.getAll("photos") as File[]).filter(
        (f) => f && typeof f === "object" && "size" in f && f.size > 0
      );
    } else {
      const body = await request.json();
      name = body.name || "";
      telegram = body.telegram || "";
      comment = body.comment || "";
      cartItems = body.cartItems || [];
      totalPrice = body.totalPrice || 0;
    }

    console.log("=== [/api/order] Новий запит на оформлення ===");
    console.log("Дані форми:", { name, telegram, totalPrice, itemsCount: cartItems?.length, photosCount: photos.length });

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

    console.log(`Відправка до Telegram Bot API (фото: ${photos.length})...`);

    // Ensure caption does not exceed Telegram 1024 char limit
    let mediaCaption = messageText;
    if (mediaCaption.length > 1020) {
      const safeComment = comment?.trim().slice(0, 150) + "...";
      mediaCaption = `🚀 <b>НОВА ЗАЯВКА З САЙТУ DWS Cards!</b>\n\n👤 <b>Клієнт:</b> ${escapeHtml(
        name.trim()
      )}\n💬 <b>Telegram:</b> ${escapeHtml(
        cleanTg
      )}\n🛒 <b>Замовлення:</b>\n${itemsText}\n💰 <b>Разом:</b> ${totalPrice} грн\n📝 <b>Побажання:</b> ${escapeHtml(
        safeComment
      )}\n\n🕐 <b>Дата та час:</b> ${formattedDate}`;
    }

    try {
      let tgRes: Response;

      if (photos.length === 1) {
        // Single photo with order caption attached
        const tgFormData = new FormData();
        tgFormData.append("chat_id", chatId);
        tgFormData.append("photo", photos[0], photos[0].name || "design.jpg");
        tgFormData.append("caption", mediaCaption);
        tgFormData.append("parse_mode", "HTML");

        tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          body: tgFormData,
        });
      } else if (photos.length > 1) {
        // Media group (album of 2-5 photos) with order caption on the first photo
        const tgFormData = new FormData();
        tgFormData.append("chat_id", chatId);

        const media = photos.slice(0, 5).map((file, idx) => {
          const attachKey = `photo_${idx}`;
          tgFormData.append(attachKey, file, file.name || `photo_${idx}.jpg`);
          return {
            type: "photo",
            media: `attach://${attachKey}`,
            ...(idx === 0 ? { caption: mediaCaption, parse_mode: "HTML" } : {}),
          };
        });

        tgFormData.append("media", JSON.stringify(media));

        tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMediaGroup`, {
          method: "POST",
          body: tgFormData,
        });
      } else {
        // Text-only message
        tgRes = await fetch(
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
      }

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
