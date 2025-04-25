"use client";

import type { FC } from "react";
import FileTable from "~/components/Drive/FileTable/FileTable";

const Shared: FC = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shared with me</h1>
        <p className="text-muted-foreground text-sm">
          Files shared with you by others
        </p>
      </div>
      <div className="relative overflow-auto">
        <FileTable parentId={null} />
      </div>
    </>
  );
};

export default Shared;
