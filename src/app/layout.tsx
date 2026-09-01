import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "HardClean - виїзна хімчистка м'яких меблів у Вінниці",
  description: "Професійна виїзна хімчистка диванів, матраців, крісел, стільців та килимів у Вінниці та області.",
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
      className={`${caveat.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-body selection:bg-brand-accent selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
