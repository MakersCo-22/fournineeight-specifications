import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FourNineEight | Apartment 1 Interior Specifications",
  description: "Apartment 1 interior specification schedule for FourNineEight.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
