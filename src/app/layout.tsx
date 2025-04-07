// import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // include 300
  variable: "--font-inter", // optional: for custom usage
});

export const metadata = {
  title: "Anime Rec",
  description: "Choose your poison",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pb-24">{children}</main>
        <Footer />
      </body>

    </html>
  );
}
