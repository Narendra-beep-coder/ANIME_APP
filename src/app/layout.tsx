import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AniManga Hub - Watch Anime & Read Manga",
  description: "Stream anime and read manga online for free. Your one-stop destination for all anime and manga content.",
  keywords: ["anime", "manga", "streaming", "watch anime", "read manga", "free anime"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[var(--bg-primary)] grid-pattern">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="border-t border-[var(--border)] py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[var(--text-secondary)] text-sm">
                © {new Date().getFullYear()} AniManga Hub. All rights reserved.
              </p>
              <p className="text-[var(--text-muted)] text-xs mt-2">
                Content provided by allmanga.to
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
