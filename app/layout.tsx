import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneTime Studios",
  description: "Book studio space in under 2 minutes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
