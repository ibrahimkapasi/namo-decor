import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const accent = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-accent" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Namo Decor | 3D Visualization Studio",
  description:
    "3D visualization and end-to-end design support for architects, interior designers, builders and studios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${accent.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
