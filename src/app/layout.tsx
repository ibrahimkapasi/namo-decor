import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Namo Decor | 3D Visualization Studio",
  description:
    "3D visualization and end-to-end design support for architects, interior designers, builders and studios.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
