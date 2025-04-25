"use client";

import type { FC } from "react";
import FileTable from "~/components/Drive/FileTable/FileTable";

const Starred: FC = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Starred</h1>
        <p className="text-muted-foreground text-sm">
          Files you've marked as important
        </p>
      </div>
      <div className="relative overflow-auto">
        <FileTable parentId={null} />
      </div>
    </>
  );
};

export default Starred;
