"use client";

import { searchFiles } from "~/lib/mock-data";
import FileTable from "~/components/Drive/FileTable/FileTable";
import Navbar from "~/components/Drive/Navbar/Navbar";
import Sidebar from "~/components/Drive/Sidebar/Sidebar";
import { XCircle } from "lucide-react";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  const searchResults = searchFiles(query);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar onMenuToggle={() => {}} />
      <Sidebar isOpen={true} />

      <main className="flex-1 pl-64">
        <div className="container mx-auto p-6 pt-4">
          <div className="mb-8">
            <div className="mb-6">
              <h1 className="mb-1 text-2xl font-bold">Search Results</h1>
              <p className="text-muted-foreground text-sm">
                {searchResults.length} results for "{query}"
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                <XCircle className="text-muted-foreground mb-2 h-10 w-10" />
                <h3 className="text-lg font-medium">No results found</h3>
                <p className="text-muted-foreground text-sm">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="relative overflow-auto">
                <FileTable files={searchResults} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
