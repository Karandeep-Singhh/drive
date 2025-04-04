import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shared with me | Drive Clone",
  description: "View files and folders that have been shared with you",
  openGraph: {
    title: "Shared with me | Drive Clone",
    description: "View files and folders that have been shared with you",
    siteName: "Drive Clone",
  },
};

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
