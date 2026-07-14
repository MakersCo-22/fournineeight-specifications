import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "FourNineEight | Apartment 01 Interior Collection",
    description: "Explore the considered materials, fixtures, appliances and architectural details of Apartment 01 at FourNineEight.",
    openGraph: {
      title: "FourNineEight | Apartment 01 Interior Collection",
      description: "A considered interior shaped by natural materials and architectural precision.",
      type: "website",
      images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "FourNineEight Apartment 01 material collection" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "FourNineEight | Apartment 01 Interior Collection",
      description: "A considered interior shaped by natural materials and architectural precision.",
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
