import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Starred | Drive Clone",
  description: "View your starred files and folders",
  openGraph: {
    title: "Starred | Drive Clone",
    description: "View your starred files and folders",
    siteName: "Drive Clone",
  },
};

export default function StarredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
