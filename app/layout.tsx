import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vladislav Solomonov",
    template: "%s | Vladislav Solomonov",
  },
  description: "Vladislav Solomonov - Developer and Mathematics student at Nazarbayev University.",
  keywords: ["Vladislav Solomonov", "vlat247", "Nazarbayev University", "Developer", "Mathematics", "Ust-Talovka"],
  authors: [{ name: "Vladislav Solomonov", url: "https://github.com/vlat247" }],
  creator: "Vladislav Solomonov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vlat247.github.io",
    title: "Vladislav Solomonov",
    description: "Developer and Mathematics student at Nazarbayev University.",
    siteName: "Vladislav Solomonov",
  },
  twitter: {
    card: "summary",
    title: "Vladislav Solomonov",
    description: "Developer and Mathematics student at Nazarbayev University.",
    creator: "@vlat247",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSerif.variable} antialiased`}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
