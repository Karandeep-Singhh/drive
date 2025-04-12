"use client";

import type { FC } from "react";
import { Button } from "~/components/ui/button";
import { formatBytes, storageQuota } from "~/lib/mock-data";

const Storage: FC = () => {
  const usedPercentage = (storageQuota.used / storageQuota.total) * 100;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Storage</h1>
      <p className="text-muted-foreground text-sm">Storage usage and quota</p>

      <div className="mt-4 max-w-md">
        <div className="bg-muted mb-1 h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full"
            style={{ width: `${usedPercentage}%` }}
          />
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          {formatBytes(storageQuota.used)} of {formatBytes(storageQuota.total)}{" "}
          used
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
                <p className="text-muted-foreground text-xs">15 files</p>
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
                <p className="text-muted-foreground text-xs">8 files</p>
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
                <p className="text-muted-foreground text-xs">32 files</p>
              </div>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Storage;
