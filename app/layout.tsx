import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "AnaFotos | Fotografia Profissional — Essência & Qualidade",
  description:
    "Portfólio de fotografia profissional de Ana. Ensaios, retratos, gestantes, infantil e eventos. Cada clique é uma memória eternizada.",
  keywords:
    "fotografia, ensaios, retratos, gestantes, infantil, aniversários, sensuais, natureza, eventos, fotógrafa, Goiânia",
  openGraph: {
    title: "AnaFotos | Fotografia Profissional — Essência & Qualidade",
    description:
      "Portfólio de fotografia profissional. Ensaios, retratos, gestantes, infantil e eventos. Cada clique é uma memória eternizada.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen md:cursor-none bg-black text-white retro-vignette">{children}</body>
    </html>
  );
}
