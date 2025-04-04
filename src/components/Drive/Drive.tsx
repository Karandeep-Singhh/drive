"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import FileTable from "./FileTable/FileTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MOCK_DRIVE_DATA } from "~/lib/mock-data";

interface DriveProps {
  currentFolderId?: string;
}

const Drive: React.FC<DriveProps> = ({ currentFolderId = "root" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("my-drive");

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />

      <main
        className={`flex-1 transition-all ${sidebarOpen ? "pl-64" : "pl-0"}`}
      >
        <div className="container mx-auto p-6 pt-4">
          <div className="mb-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6 grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="my-drive">My Drive</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
              </TabsList>

              <TabsContent value="my-drive" className="mt-0">
                <div className="mb-6">
                  <h1 className="mb-1 text-2xl font-bold">
                    {currentFolder ? currentFolder.name : "My Drive"}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {currentFolder
                      ? `Files in ${currentFolder.name}`
                      : "All your files in one place"}
                  </p>
                </div>
                <FileTable parentId={currentFolderId} />
              </TabsContent>

              <TabsContent value="shared" className="mt-0">
                <div className="mb-6">
                  <h1 className="mb-1 text-2xl font-bold">Shared with me</h1>
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
                  <h1 className="mb-1 text-2xl font-bold">Starred</h1>
                  <p className="text-muted-foreground text-sm">
                    Files you've marked as important
                  </p>
                </div>
                <div className="relative overflow-auto">
                  <FileTable parentId={null} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Drive;
