import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const text = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text",
});

export const metadata: Metadata = {
  title: "Namo Decor | 3D Visualization Studio",
  description:
    "3D visualization and end-to-end design support for architects, interior designers, builders and studios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
