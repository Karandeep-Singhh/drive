"use client";

import { getStarredFiles } from "~/lib/mock-data";
import FileTable from "~/components/Drive/FileTable/FileTable";
import Navbar from "~/components/Drive/Navbar/Navbar";
import Sidebar from "~/components/Drive/Sidebar/Sidebar";
import { Star } from "lucide-react";
import { useState } from "react";

export default function StarredPage() {
  const starredFiles = getStarredFiles();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Sidebar isOpen={true} />

      <main className="flex-1 pl-64">
        <div className="container mx-auto p-6 pt-4">
          <div className="mb-8">
            <div className="mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <h1 className="text-2xl font-bold">Starred</h1>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              {"Files and folders you've marked as important"}
            </p>

            <div className="relative overflow-auto">
              <FileTable files={starredFiles} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
