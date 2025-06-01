import type { Metadata } from "next";
import { MOCK_DRIVE_DATA } from "~/lib/mock-data";

interface FolderLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({
  params,
}: FolderLayoutProps): Promise<Metadata> {
  const folderId = params.id;
  const folder = MOCK_DRIVE_DATA.find(
    (item) => item.id === folderId && item.type === "directory",
  );

  if (!folder) {
    return {
      title: "Folder Not Found | Drive Clone",
      description: "The requested folder could not be found.",
    };
  }

  return {
    title: `${folder.name} | Drive Clone`,
    description: `View contents of ${folder.name} folder`,
  };
}

export default function FolderLayout({ children }: FolderLayoutProps) {
  return children;
}
