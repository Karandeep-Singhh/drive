"use client";

import type { FC } from "react";
import { XCircle } from "lucide-react";
import FileTable from "~/components/Drive/FileTable/FileTable";
import type { DriveItem } from "~/lib/mock-data";

type Props = {
  q: string;
  searchResults: DriveItem[];
};

const SearchResults: FC<Props> = ({ q, searchResults }) => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Search Results</h1>
          <p className="text-muted-foreground text-sm">
            {`${searchResults.length} results for "${q}"`}
          </p>
        </div>
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
          <FileTable tableData={searchResults} />
        </div>
      )}
    </>
  );
};

export default SearchResults;
