import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "badhope · Personal Space",
  description: "Welcome to my digital universe"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
