import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F9F7F3",
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
      className={`${cormorant.variable} ${syne.variable} antialiased`}
    >
      <body className="min-h-screen md:cursor-none bg-background text-foreground warm-vignette">{children}</body>
    </html>
  );
}
