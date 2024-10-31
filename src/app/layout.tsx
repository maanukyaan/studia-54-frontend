import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav/Nav";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "architecture",
  description:
    "We, as a brand, turn your dreams into fantastique interiors and architectural designs. Our projects inspire the pursuit of your great aspirations. We create the alchemy of luxury and the enjoyment of our clientèle",
  authors: [{ name: "Vahe Manukyan", url: "https://whoiskenshi.t.me" }],
  keywords: ["architecture", "design", "interiors", "luxury"],
  icons: "https://studia-54.com/favicon.png",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-background text-white flex flex-col min-h-dvh`}
      >
        <Nav />
        <main className="grow flex flex-col justify-center items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
