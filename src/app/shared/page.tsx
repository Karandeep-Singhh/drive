"use client";

import { getSharedFiles } from "~/lib/mock-data";
import FileTable from "~/components/Drive/FileTable/FileTable";
import Navbar from "~/components/Drive/Navbar/Navbar";
import Sidebar from "~/components/Drive/Sidebar/Sidebar";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function SharedPage() {
  const sharedFiles = getSharedFiles();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Sidebar isOpen={true} />

      <main className="flex-1 pl-64">
        <div className="container mx-auto p-6 pt-4">
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-2">
              <Share2 className="h-6 w-6 text-blue-500" />
              <h1 className="text-2xl font-bold">Shared with me</h1>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Files and folders that have been shared with you
            </p>

            <div className="relative overflow-auto">
              <FileTable files={sharedFiles} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
