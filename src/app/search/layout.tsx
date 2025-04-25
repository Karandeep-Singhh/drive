import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | Drive Clone",
  description: "Search results from your Drive files",
  openGraph: {
    title: "Search Results | Drive Clone",
    description: "Search results from your Drive files",
    siteName: "Drive Clone",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
