"use client";

import type { FC } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { MOCK_DRIVE_DATA } from "~/lib/mock-data";
import type { DriveItem } from "~/lib/mock-data";

interface BreadcrumbsProps {
  currentFolderId: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ currentFolderId }) => {
  // Generate the breadcrumb trail by traversing upwards through parent folders
  const generateBreadcrumbPath = (): DriveItem[] => {
    const path: DriveItem[] = [];
    let currentItem = MOCK_DRIVE_DATA.find(
      (item) => item.id === currentFolderId,
    );

    // Don't show breadcrumbs if we're at the root
    if (currentFolderId === "root" || !currentItem) {
      return path;
    }

    // Add the current folder
    path.unshift(currentItem);

    // Traverse up through parents
    while (currentItem?.parentId && currentItem.parentId !== "root") {
      const parentItem = MOCK_DRIVE_DATA.find(
        (item) => item.id === currentItem?.parentId,
      );
      if (parentItem) {
        path.unshift(parentItem);
        currentItem = parentItem;
      } else {
        break;
      }
    }

    return path;
  };

  const breadcrumbPath = generateBreadcrumbPath();

  // If we're at the root, don't show breadcrumbs
  if (currentFolderId === "root" || breadcrumbPath.length === 0) {
    return null;
  }

  return (
    <div className="text-muted-foreground mb-4 flex items-center text-sm">
      <Link href="/" className="hover:text-foreground flex items-center">
        <Home className="mr-1 h-4 w-4" />
        <span>My Drive</span>
      </Link>

      {breadcrumbPath.map((item, index) => (
        <div key={item.id} className="flex items-center">
          <ChevronRight className="mx-1 h-4 w-4" />
          {index === breadcrumbPath.length - 1 ? (
            <span className="text-foreground">{item.name}</span>
          ) : (
            <Link href={`/folder/${item.id}`} className="hover:text-foreground">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
