import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s | Drive Clone",
    default: "Drive Clone",
  },
  description: "Google Drive Clone UI with dark mode",
  keywords: ["drive", "clone", "files", "storage", "cloud"],
  authors: [{ name: "Drive Clone Team" }],
  creator: "Drive Clone Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drive-clone.vercel.app",
    title: "Drive Clone",
    description: "Google Drive Clone UI with dark mode",
    siteName: "Drive Clone",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
