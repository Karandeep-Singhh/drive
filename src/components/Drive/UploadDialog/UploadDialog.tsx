import { CheckIcon, File, Upload, X } from "lucide-react";
import type { FC } from "react";
import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Progress } from "~/components/ui/progress";
import { useUpload } from "~/components/Drive/UploadProvider/UploadProvider";
import type { APIDirectory } from "~/service/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadDone: () => void;
  currentDirectory?: APIDirectory;
};

const UploadDialog: FC<Props> = ({
  open,
  onOpenChange,
  currentDirectory,
  onUploadDone,
}) => {
  console.log("current dir", currentDirectory);
  const {
    uploadQueue,
    addFilesToUpload,
    uploadAllPendingFiles,
    removeFile,
    clearQueue,
  } = useUpload();

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    addFilesToUpload(files, currentDirectory?.id);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addFilesToUpload(files, currentDirectory?.id);
    }
  };

  const handleUpload = async () => {
    uploadAllPendingFiles();
  };
  const handleDone = () => {
    clearQueue();
    onOpenChange(false);
    onUploadDone();
  };

  const uploaded = uploadQueue.every(
    (e) => e.status === "success" || e.status === "error",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Upload files to {currentDirectory?.name || "My Drive"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div
            className="border-border rounded-lg border-2 border-dashed p-8 text-center"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileSelect}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="text-muted-foreground mx-auto h-12 w-12" />
              <p className="text-muted-foreground mt-2 text-sm">
                Drag and drop files here, or click to select files
              </p>
            </label>
          </div>

          {uploadQueue.length > 0 && (
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Selected files ({uploadQueue.length})
                </h3>
                <Button variant="ghost" size="sm" onClick={clearQueue}>
                  Clear all
                </Button>
              </div>
              <div className="grid max-h-[200px] gap-2 overflow-y-auto">
                {uploadQueue.map((uploadItem, index) => (
                  <div key={uploadItem.id} className="border p-2">
                    <div className="flex items-center justify-between rounded-lg">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {uploadItem.file.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {(uploadItem.file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                      {uploadItem.status === "success" ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(uploadItem.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {uploadItem.status === "uploading" && (
                      <Progress value={uploadItem.progress} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {!uploaded && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  clearQueue();
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </>
          )}
          {uploaded && <Button onClick={handleDone}>Done</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
