import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Elite International Match Maker - Premium Dating & Matchmaking Services",
  description:
    "Elite International Match Maker offers premium dating and matchmaking services. Connect with beautiful, intelligent women from Colombia and Latin America. Professional matchmaking for serious relationships and marriage.",
  keywords: [
    "elite matchmaker",
    "international dating",
    "Colombian women",
    "Latin American dating",
    "premium matchmaking",
    "marriage services",
    "dating agency",
    "relationship services",
    "elite dating",
    "matchmaking services",
  ],
  authors: [{ name: "Elite International Match Maker" }],
  creator: "Elite International Match Maker",
  publisher: "Elite International Match Maker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://elitematchmaker.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elitematchmaker.com",
    siteName: "Elite International Match Maker",
    title:
      "Elite International Match Maker - Premium Dating & Matchmaking Services",
    description:
      "Elite International Match Maker offers premium dating and matchmaking services. Connect with beautiful, intelligent women from Colombia and Latin America. Professional matchmaking for serious relationships and marriage.",
    images: [
      {
        url: "/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Elite International Match Maker - Premium Dating Services",
      },
      {
        url: "/og-image-twitter.jpg",
        width: 1200,
        height: 600,
        alt: "Elite International Match Maker - Twitter Card",
      },
      {
        url: "/og-image-facebook.jpg",
        width: 1200,
        height: 630,
        alt: "Elite International Match Maker - Facebook Share",
      },
      {
        url: "/og-image-instagram.jpg",
        width: 1080,
        height: 1080,
        alt: "Elite International Match Maker - Instagram Post",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@elitematchmaker",
    creator: "@elitematchmaker",
    title:
      "Elite International Match Maker - Premium Dating & Matchmaking Services",
    description:
      "Elite International Match Maker offers premium dating and matchmaking services. Connect with beautiful, intelligent women from Colombia and Latin America.",
    images: ["/og-image-twitter.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "dating",
  classification: "dating and matchmaking services",
  other: {
    "theme-color": "#8B5CF6",
    "msapplication-TileColor": "#8B5CF6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Elite Match Maker",
    "application-name": "Elite International Match Maker",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Elite Match Maker" />

        {/* Structured Data for Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Elite International Match Maker",
              url: "https://elitematchmaker.com",
              logo: "https://elitematchmaker.com/logo.png",
              description:
                "Premium dating and matchmaking services connecting people for serious relationships and marriage",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "info@elitematchmaker.com",
              },
              sameAs: [
                "https://www.facebook.com/elitematchmaker",
                "https://www.instagram.com/elitematchmaker",
                "https://twitter.com/elitematchmaker",
              ],
              serviceType: "Dating and Matchmaking Services",
              areaServed: ["United States", "Colombia", "Latin America"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Dating Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Bachelor Pilot Show",
                      description:
                        "Premium matchmaking program in Santa Marta, Colombia",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
