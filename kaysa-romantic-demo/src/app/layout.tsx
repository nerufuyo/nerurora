import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "For Kaysa - Romantic Demo",
  description: "A romantic animated demo with Matrix effects, particle systems, and beautiful typography, dedicated to Kaysa",
  keywords: ["romantic", "animation", "demo", "matrix", "particles", "love"],
  authors: [{ name: "Created with love" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
