import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { CardThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dwscards.com"),
  title: "DWS Cards - NFC-картки для бізнесу",
  description: "NFC-картки для бізнесу. Швидкий та зручний збір 5★ відгуків Google в один дотик без QR-кодів.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "DWS Cards - NFC-картки для бізнесу",
    description: "NFC-картки для бізнесу: Google Maps та індивідуальний дизайн. 5★ відгуків в один дотик.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 1200, alt: "DWS Cards Logo" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${caveat.className} h-full antialiased theme-transition`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WHC4LT2ZJ6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WHC4LT2ZJ6', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-body selection:bg-brand-accent selection:text-white">
        <CardThemeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </CardThemeProvider>
      </body>
    </html>
  );
}
