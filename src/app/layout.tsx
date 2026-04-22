import type { Metadata } from "next";
import { Syne, Bebas_Neue, Syne_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const syneMono = Syne_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Open Mic — Бүртгэл",
  description: "Open Mic Night Ulaanbaatar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className="scroll-smooth">
      <body className={`${syne.variable} ${bebas.variable} ${syneMono.variable} font-sans bg-[#080808] text-[#f0ede6] antialiased`}>
        {children}
      </body>
    </html>
  );
}