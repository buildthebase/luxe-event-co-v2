import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const siteUrl = "https://luxeeventco.ca";
const googleThumbnailUrl = `${siteUrl}/google-thumbnail.png`;
const title = "Luxe Event Co. | Coffee, Desserts & Seating Rentals Toronto";
const description =
  "Luxe Event Co. brings crafted coffee, elevated desserts, and elegant seating rentals to memorable events and celebrations across Toronto.";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Luxe Event Co.",
  title,
  description,
  alternates: { canonical: "/" },
  other: {
    thumbnail: googleThumbnailUrl,
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
    siteName: "Luxe Event Co.",
    locale: "en_CA",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 908, alt: "Luxe Event Co." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Luxe Event Co.",
      url: siteUrl,
      image: { "@id": `${siteUrl}/#primaryimage` },
      description,
      sameAs: [
        "https://www.instagram.com/luxecoffeebar.to/",
        "https://www.instagram.com/luxesweet.cart/",
        "https://www.instagram.com/luxeseatingrentals",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Luxe Event Co.",
      description,
      inLanguage: "en-CA",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#primaryimage`,
      url: googleThumbnailUrl,
      contentUrl: googleThumbnailUrl,
      width: 1200,
      height: 1200,
      caption: "Luxe Event Co. - Coffee, Desserts and Seating",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: { "@id": `${siteUrl}/#primaryimage` },
      inLanguage: "en-CA",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
