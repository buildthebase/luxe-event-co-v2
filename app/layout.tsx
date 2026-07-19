import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Luxe Event Co. | Elevated Event Experiences",
    description:
      "Premium coffee, dessert, and event rental experiences from Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals.",
    openGraph: {
      title: "Luxe Event Co.",
      description: "Made for moments worth lingering over.",
      type: "website",
      images: [{ url: "/og.png", width: 1733, height: 909, alt: "Luxe Event Co." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Luxe Event Co.",
      description: "Made for moments worth lingering over.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
