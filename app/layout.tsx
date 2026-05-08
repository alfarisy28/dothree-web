import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Dothree Santana Prisma",
  description:
    "PT Dothree Santana Prisma adalah perusahaan IT Infrastructure dan Technology Services Indonesia yang berfokus pada solusi digital, jaringan, server, keamanan, dan transformasi teknologi.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PT Dothree Santana Prisma",
              url: "https://www.dothree.co.id",
              logo: "https://www.dothree.co.id/logo3.png",
              description:
                "Perusahaan IT Infrastructure dan Technology Services Indonesia.",
            }),
          }}
        />
      </head>

      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}