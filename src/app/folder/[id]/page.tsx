"use client";

import { notFound } from "next/navigation";
import { MOCK_DRIVE_DATA } from "~/lib/mock-data";
import Drive from "~/components/Drive";

export default function FolderPage({ params }: { params: { id: string } }) {
  const folderId = params.id;
  const folder = MOCK_DRIVE_DATA.find(
    (item) => item.id === folderId && item.type === "folder",
  );

  if (!folder) {
    notFound();
  }

  return <Drive currentFolderId={folderId} />;
}
