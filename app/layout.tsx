import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://droplink-web.vercel.app"),
  title: {
    default: "Droplink - Social Links Manager",
    template: "%s | Droplink",
  },
  description: "Manage and share all your social links through a single customizable profile. The ultimate link in bio tool.",
  keywords: ["Droplink", "Link in bio", "Social Links Manager", "Profile Manager", "Social Media Tools"],
  applicationName: "Droplink",
  authors: [{ name: "Droplink Team" }],
  creator: "Droplink Team",
  publisher: "Droplink",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Droplink - Social Links Manager",
    description: "Manage and share all your social links through a single customizable profile",
    url: "https://droplink-web.vercel.app/",
    siteName: "Droplink",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Droplink - Social Links Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Droplink",
    description: "Manage and share all your social links through a single customizable profile",
    creator: "@droplink", // Placeholder, user can update
    images: ["/images/og-image.png"],
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
};

import ToastContainer from "@/components/ui/ToastContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
