import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./event-numberless.css";
import "./service-pricing-panels.css";
import "./related-experiences.css";
import { siteConfig } from "./site-config";

const siteUrl = siteConfig.url;
const googleThumbnailUrl = `${siteUrl}${siteConfig.brandAssets.googleThumbnail.src}`;
const title = siteConfig.defaultMetadata.title;
const description = siteConfig.defaultMetadata.description;
const defaultSocialImage = {
  url: siteConfig.brandAssets.defaultSocialImage.src,
  width: siteConfig.brandAssets.defaultSocialImage.width,
  height: siteConfig.brandAssets.defaultSocialImage.height,
  alt: siteConfig.brandAssets.defaultSocialImage.alt,
};
const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteConfig.name,
  title,
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      {
        url: siteConfig.brandAssets.favicon.src,
        type: "image/png",
        sizes: `${siteConfig.brandAssets.favicon.width}x${siteConfig.brandAssets.favicon.height}`,
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  verification: siteConfig.searchConsole.googleVerificationToken
    ? { google: siteConfig.searchConsole.googleVerificationToken }
    : undefined,
  other: {
    thumbnail: googleThumbnailUrl,
    ...(siteConfig.searchConsole.bingVerificationToken
      ? { "msvalidate.01": siteConfig.searchConsole.bingVerificationToken }
      : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.openGraphLocale,
    type: "website",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.brandAssets.defaultSocialImage.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language} className={sans.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
