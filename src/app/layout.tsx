import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { UserProvider } from "~/Providers/UserProvider/UserProvider";

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

import { cookies } from "next/headers";
import { pingAuth } from "~/service/authService";
import type { User } from "~/service/types";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  console.log(cookieStore)
  const token = cookieStore.get("jwt_token")?.value
  let user: User | null = null

  console.log("the token", token)

  if (token) {
    try {

      console.log("hitting pingggggg")
      user = await pingAuth(token)
    } catch (error) {
      // Token is invalid or expired
      console.error(error)
      user = null
    }
  }

  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <body className="min-h-screen antialiased">
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}