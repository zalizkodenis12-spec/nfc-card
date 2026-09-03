import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { CardThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "DWS Cards - NFC-картки для збору відгуків Google",
  description: "NFC-картки для бізнесу. Швидкий та зручний збір 5★ відгуків Google в один дотик без QR-кодів.",
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
