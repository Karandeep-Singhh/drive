"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import FileTable from "./FileTable/FileTable";
import Breadcrumbs from "./Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MOCK_DRIVE_DATA, formatBytes, storageQuota } from "~/lib/mock-data";
import {
  Plus,
  Clock,
  Share2,
  Star,
  Trash2,
  HardDrive,
  FileQuestion,
  FolderPlus,
  Upload,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface DriveProps {
  currentFolderId?: string;
}

const Drive: React.FC<DriveProps> = ({ currentFolderId = "root" }) => {
  const [activeTab, setActiveTab] = useState("my-drive");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    // If a specific folder is being viewed, ensure we're on the "My Drive" tab
    if (currentFolderId !== "root") {
      setActiveTab("my-drive");
    }
  }, [currentFolderId]);

  // Find the folder name if we're viewing a specific folder
  const currentFolder =
    currentFolderId !== "root"
      ? MOCK_DRIVE_DATA.find((item) => item.id === currentFolderId)
      : null;

  const usedPercentage = (storageQuota.used / storageQuota.total) * 100;

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto p-6 pt-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-6 grid w-full grid-cols-6">
              <TabsTrigger value="my-drive">
                <HardDrive className="mr-2 h-4 w-4" />
                My Drive
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="shared">
                <Share2 className="mr-2 h-4 w-4" />
                Shared
              </TabsTrigger>
              <TabsTrigger value="starred">
                <Star className="mr-2 h-4 w-4" />
                Starred
              </TabsTrigger>
              <TabsTrigger value="trash">
                <Trash2 className="mr-2 h-4 w-4" />
                Trash
              </TabsTrigger>
              <TabsTrigger value="storage">
                <FileQuestion className="mr-2 h-4 w-4" />
                Storage
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-drive" className="mt-0">
              {/* Show breadcrumbs when we're viewing a folder in My Drive */}
              {currentFolderId !== "root" && (
                <Breadcrumbs currentFolderId={currentFolderId} />
              )}

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {currentFolder ? currentFolder.name : "My Drive"}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {currentFolder
                      ? `Files in ${currentFolder.name}`
                      : "All your files in one place"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <FolderPlus className="h-4 w-4" />
                    <span>New folder</span>
                  </Button>

                  <Dialog
                    open={uploadDialogOpen}
                    onOpenChange={setUploadDialogOpen}
                  >
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

              <FileTable parentId={currentFolderId} />
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Recent</h1>
                <p className="text-muted-foreground text-sm">
                  Files you've recently accessed
                </p>
              </div>
              <div className="relative overflow-auto">
                <FileTable parentId={null} />
              </div>
            </TabsContent>

            <TabsContent value="shared" className="mt-0">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Shared with me</h1>
                <p className="text-muted-foreground text-sm">
                  Files shared with you by others
                </p>
              </div>
              <div className="relative overflow-auto">
                <FileTable parentId={null} />
              </div>
            </TabsContent>

            <TabsContent value="starred" className="mt-0">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Starred</h1>
                <p className="text-muted-foreground text-sm">
                  Files you've marked as important
                </p>
              </div>
              <div className="relative overflow-auto">
                <FileTable parentId={null} />
              </div>
            </TabsContent>

            <TabsContent value="trash" className="mt-0">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Trash</h1>
                <p className="text-muted-foreground text-sm">
                  Files you've deleted
                </p>
              </div>
              <div className="relative overflow-auto">
                <FileTable parentId={null} />
              </div>
            </TabsContent>

            <TabsContent value="storage" className="mt-0">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Storage</h1>
                <p className="text-muted-foreground text-sm">
                  Storage usage and quota
                </p>

                <div className="mt-4 max-w-md">
                  <div className="bg-muted mb-1 h-2 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full"
                      style={{ width: `${usedPercentage}%` }}
                    />
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {formatBytes(storageQuota.used)} of{" "}
                    {formatBytes(storageQuota.total)} used
                  </p>
                  <Button variant="outline" size="sm">
                    Buy Storage
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-medium">Folders</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Button
                      variant="outline"
                      className="h-auto justify-start p-4"
                      asChild
                    >
                      <a href="/folder/folder-1">
                        <div>
                          <h4 className="font-medium">Work Documents</h4>
                          <p className="text-muted-foreground text-xs">
                            15 files
                          </p>
                        </div>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto justify-start p-4"
                      asChild
                    >
                      <a href="/folder/folder-2">
                        <div>
                          <h4 className="font-medium">Personal</h4>
                          <p className="text-muted-foreground text-xs">
                            8 files
                          </p>
                        </div>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto justify-start p-4"
                      asChild
                    >
                      <a href="/folder/folder-3">
                        <div>
                          <h4 className="font-medium">Photos</h4>
                          <p className="text-muted-foreground text-xs">
                            32 files
                          </p>
                        </div>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Drive;
