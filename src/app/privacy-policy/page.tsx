import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-brand-bg">
      {/* Header */}
      <div className="w-full pt-6 pb-6 bg-brand-primary z-50 flex items-center px-6 md:px-16 justify-between shadow-md">
        <Link href="/" className="text-3xl md:text-5xl font-bold text-white tracking-wider cursor-pointer">
          DWS Cards
        </Link>
        <Link href="/" className="text-white font-sans font-semibold text-sm tracking-widest uppercase hover:text-brand-link-hover transition-colors">
          &larr; Назад на головну
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-brand-body">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-text mb-8">Політика конфіденційності</h1>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Ця Політика конфіденційності описує, як DWS Cards (далі — «Компанія», «ми») обробляє персональні дані користувачів сайту.
          </p>

          <h2 className="text-2xl font-bold text-brand-text mt-8 mb-4">1. Які дані ми збираємо</h2>
          <p>При зверненні до нас за телефоном або через месенджери ми можемо збирати:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Ім'я</li>
            <li>Номер телефону</li>
            <li>Адресу або відділення для доставки картки</li>
            <li>Посилання на Google-профіль або інші платформи для програмування картки</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-text mt-8 mb-4">2. Для чого ми використовуємо ці дані</h2>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Для зв'язку з клієнтом та узгодження замовлення</li>
            <li>Для програмування NFC-карток та організації доставки</li>
            <li>Для покращення якості обслуговування</li>
          </ul>

          <h2 className="text-2xl font-bold text-brand-text mt-8 mb-4">3. Зберігання та захист даних</h2>
          <p>
            Ми не передаємо ваші персональні дані третім особам, окрім випадків, передбачених законодавством України. Дані зберігаються безпечно та використовуються виключно для виконання замовлення.
          </p>

          <h2 className="text-2xl font-bold text-brand-text mt-8 mb-4">4. Права користувача</h2>
          <p>
            Ви маєте право запросити видалення своїх даних з нашої бази, звернувшись за контактними даними, вказаними на сайті.
          </p>

          <h2 className="text-2xl font-bold text-brand-text mt-8 mb-4">5. Контакти</h2>
          <p>
            З питань щодо цієї Політики звертайтесь через контакти, вказані на сайті.
          </p>

          <p className="mt-12 text-sm text-gray-500 font-semibold">
            Дата останнього оновлення: 19 серпня 2026
          </p>
        </div>
      </div>
    </main>
  );
}
