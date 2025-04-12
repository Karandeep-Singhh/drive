"use client";

import type { FC } from "react";
import { useState } from "react";
import { Upload, FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import FileTable from "~/components/Drive/FileTable/FileTable";

const MyDrive: FC = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Drive</h1>
          <p className="text-muted-foreground text-sm">
            All your files in one place
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            <span>New folder</span>
          </Button>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select folder to upload to</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setUploadDialogOpen(false)}
                  >
                    My Drive
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setUploadDialogOpen(false)}
                  >
                    Work Documents
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setUploadDialogOpen(false)}
                  >
                    Personal
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => setUploadDialogOpen(false)}
                  >
                    Photos
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <FileTable parentId="root" />
    </>
  );
};

export default MyDrive;
