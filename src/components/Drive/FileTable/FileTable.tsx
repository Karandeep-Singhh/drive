"use client";

import { useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { deleteFile, downloadFile } from "~/service/fileService";
import { isFile, type APIFile, type DriveItem } from "~/service/types";
import { deleteDir } from "~/service/dirService";
import DriveItemRow from "./DriveItemRow";
import { shouldOpenPreview, type PreviewDialogState } from "./types";
import PreviewDialog from "./PreivewDialog/PreviewDialog";

type Props = {
  tableData: DriveItem[];
  onDelete: () => void;
};

const FileTable: FC<Props> = ({ tableData, onDelete }) => {
  const router = useRouter();
  const [previewDialogState, setPreviewDialogState] =
    useState<PreviewDialogState>({
      __tag: "close",
    });

  const handleItemClick = (driveItem: DriveItem) => {
    if (isFile(driveItem)) {
      return setPreviewDialogState({ __tag: "open", file: driveItem });
    }

    router.push(`/folder/${driveItem.id}`);
  };

  const handleDownload = (file: DriveItem) => () => {
    if(file.type === 'Directory') return // TODO support archive download later

    downloadFile(file.id)
  };

  const handleDelete = (file: DriveItem) => {
    if (isFile(file)) {
      deleteFile(file.blobRef).then(onDelete);
    } else {
      deleteDir(file.id).then(onDelete);
    }
  };

  return (
    <div className="relative overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>File size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <XCircle className="text-muted-foreground h-8 w-8" />
                  <p className="text-lg font-medium">No files found</p>
                  <p className="text-muted-foreground text-sm">
                    This folder is empty
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item) => (
              <DriveItemRow
                key={item.type + "_" + item.id}
                item={item}
                onDelete={handleDelete}
                onDownload={handleDownload}
                onItemClick={handleItemClick}
              />
            ))
          )}
        </TableBody>
      </Table>
      {shouldOpenPreview(previewDialogState) && (
        <PreviewDialog
          file={previewDialogState.file}
          open={true}
          onClose={() => setPreviewDialogState({ __tag: "close" })}
        />
      )}
    </div>
  );
};

export default FileTable;
