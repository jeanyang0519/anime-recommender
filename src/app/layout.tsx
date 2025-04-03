// import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // include 300
  variable: "--font-inter", // optional: for custom usage
});

export const metadata = {
  title: "Anime Rec",
  description: "Choose your poison",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="font-light">{children}</body>
    </html>
  );
}
