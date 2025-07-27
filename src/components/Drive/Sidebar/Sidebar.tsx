"use client";

import type { FC } from "react";
import { usePathname } from "next/navigation";
import { Plus, Clock, Share2, Star, Trash2, HardDrive, FileQuestion, FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { formatBytes } from "~/lib/utils";
import Link from "next/link";

const storageQuota = {
  used: 10 * 1024 * 1024 * 1024, // 10 GB
  total: 15 * 1024 * 1024 * 1024, // 15 GB
};

type Props = {
  isOpen: boolean;
};

const Sidebar: FC<Props> = ({ isOpen }) => {
  const pathname = usePathname();
  const usedPercentage = (storageQuota.used / storageQuota.total) * 100;

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-0 -translate-x-full"} border-border bg-card fixed inset-y-0 left-0 z-20 flex h-screen flex-col border-r pt-16 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {/* Create Button */}
        <div className="mb-2 px-2">
          <Button className="w-full justify-start gap-2 rounded-full">
            <Plus className="h-4 w-4" />
            <span>Create</span>
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="grid gap-1">
          <Button
            variant={pathname === "/" ? "secondary" : "ghost"}
            className="justify-start gap-3 px-3"
            asChild
          >
            <Link href="/">
              <HardDrive className="h-4 w-4" />
              <span>My Drive</span>
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start gap-3 px-3">
            <Clock className="h-4 w-4" />
            <span>Recent</span>
          </Button>
          <Button
            variant={pathname === "/starred" ? "secondary" : "ghost"}
            className="justify-start gap-3 px-3"
            asChild
          >
            <Link href="/starred">
              <Star className="h-4 w-4" />
              <span>Starred</span>
            </Link>
          </Button>
          <Button
            variant={pathname === "/shared" ? "secondary" : "ghost"}
            className="justify-start gap-3 px-3"
            asChild
          >
            <Link href="/shared">
              <Share2 className="h-4 w-4" />
              <span>Shared with me</span>
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start gap-3 px-3">
            <Trash2 className="h-4 w-4" />
            <span>Trash</span>
          </Button>
        </nav>

        <Separator className="my-3" />

        {/* Storage section */}
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center gap-2">
            <FileQuestion className="h-4 w-4" />
            <span className="text-sm">Storage</span>
          </div>
          <div className="bg-muted mb-1 h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full"
              style={{ width: `${usedPercentage}%` }}
            />
          </div>
          <p className="text-muted-foreground mb-4 text-xs">
            {formatBytes(storageQuota.used)} of{" "}
            {formatBytes(storageQuota.total)} used
          </p>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Buy Storage
          </Button>
        </div>

        <Separator className="my-3" />

        {/* Folders */}
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Folders</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <FolderPlus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-1">
            <Button
              variant="ghost"
              className="justify-start px-3 text-sm font-normal"
              asChild
            >
              <Link href="/folder/folder-1">Work Documents</Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-3 text-sm font-normal"
              asChild
            >
              <Link href="/folder/folder-2">Personal</Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start px-3 text-sm font-normal"
              asChild
            >
              <Link href="/folder/folder-3">Photos</Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
