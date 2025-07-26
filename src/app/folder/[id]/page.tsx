import { notFound } from "next/navigation";
import Drive from "~/components/Drive";

type Props = {
  params: Promise<{ id: number }>;
};

export default async function FolderPage({ params }: Props) {
  const { id } = await params;
  // const folder = MOCK_DRIVE_DATA.find(
  //   (item) => item.id === id && item.type === "directory",
  // );

  // if (!folder) {
  //   notFound();
  // }

  return <Drive currentFolderId={+id} />;
}
