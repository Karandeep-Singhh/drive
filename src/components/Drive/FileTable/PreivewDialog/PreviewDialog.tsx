import { useState, type FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { getBaseURL } from "~/service/http";
import type { APIFile } from "~/service/types";
import PdfViewer from "./PdfViewer";

type Props = {
  open: boolean;
  file: APIFile;
  onClose: () => void;
};

const PreviewDialog: FC<Props> = ({ file, open, onClose }) => {
  const [imageError, setImageError] = useState(false);
  const handleClose = (open?: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl lg:max-w-6xl l h-[80vh] flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle>{file.name ?? "File"}</DialogTitle>
        </DialogHeader>
        {file.type === "Image" && !imageError && (
          <img
            src={`${getBaseURL()}/v1/files/${file.id}/preview`}
            onError={() => setImageError(true)}
          />
        )}
        {imageError && "Failed to load image"}
        {file.type === "Pdf" && <PdfViewer file={file} />}
        <DialogFooter>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
