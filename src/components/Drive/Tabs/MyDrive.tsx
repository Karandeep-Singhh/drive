import { useState, type FC, Suspense, use, useEffect } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import UploadDialog from "../UploadDialog/UploadDialog";
import FileTable from "../FileTable/FileTable";
import { type DriveItem } from "~/lib/mock-data";
import Loading from "~/app/loading";
import { getAllDirUnder } from "~/service/dirService";
import type { APIDirectory, APIFile } from "~/service/types";
import { getAllFilesUnderDir } from "~/service/fileService";
import AddDirectoryInput from "~/components/Drive/AddDirectoryInput";
import { useDrive } from "~/components/Drive/DriveProvider/useDrive";

type Props = {
  currentDirectoryId?: number;
};
const MyDrive: FC<Props> = ({ currentDirectoryId }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [dirsUnderCurrentDir, setDirsUnderCurrentDir] = useState<
    APIDirectory[]
  >([]);
  const [filesUnderDir, setFilesUnderDir] = useState<APIFile[]>([]);
  const { allDirectories } = useDrive();

  const currentDir = currentDirectoryId
    ? allDirectories.find((item) => item.id == currentDirectoryId)
    : undefined;

  const dirs: DriveItem[] = dirsUnderCurrentDir.map((e) => ({
    ...e,
    type: "directory",
    owner: "Me",
  }));

  const files: DriveItem[] = filesUnderDir.map((e) => ({
    ...e,
    type: "image", //change it via file type from metadata
    owner: "Me",
  }));

  const tableData = [...dirs, ...files];

  const getFilesAndDirs = () => {
    getAllDirUnder(currentDirectoryId).then(setDirsUnderCurrentDir);
    getAllFilesUnderDir(currentDirectoryId).then(setFilesUnderDir);
  };

  useEffect(() => {
    getFilesAndDirs();
  }, [allDirectories]);

  return (
    <Suspense fallback={<Loading />}>
      {currentDirectoryId != null && (
        <Breadcrumbs currentDirId={currentDirectoryId} />
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {currentDir ? currentDir.name : "My Drive"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {currentDir
              ? `Files in ${currentDir.name}`
              : "All your files in one place"}
          </p>
        </div>

        <div className="flex gap-2">
          <AddDirectoryInput currentDirId={currentDirectoryId} />
          <UploadDialog
            open={uploadDialogOpen}
            onUploadDone={getFilesAndDirs}
            onOpenChange={setUploadDialogOpen}
            currentDirectory={currentDir}
          />
        </div>
      </div>

      <FileTable tableData={tableData} />
    </Suspense>
  );
};

export default MyDrive;
