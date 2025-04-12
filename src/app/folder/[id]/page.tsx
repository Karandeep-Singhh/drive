import { notFound } from "next/navigation";
import { MOCK_DRIVE_DATA } from "~/lib/mock-data";
import Drive from "~/components/Drive";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FolderPage({ params }: Props) {
  const { id } = await params;
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const folder = MOCK_DRIVE_DATA.find(
    (item) => item.id === id && item.type === "folder",
  );

  if (!folder) {
    notFound();
  }

  return <Drive currentFolderId={id} />;
}
