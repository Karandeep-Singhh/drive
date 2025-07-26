"use client";

import {} from "react";
import FileTable from "~/components/Drive/FileTable/FileTable";

const Starred = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Starred</h1>
        <p className="text-muted-foreground text-sm">
          Files you&apos;ve marked as starred
        </p>
      </div>
      <div className="relative overflow-auto">
        <FileTable tableData={[]} />
      </div>
    </>
  );
};

export default Starred;
