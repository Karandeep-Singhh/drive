"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Star, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import {
  formatBytes,
  getFilesByParentId,
  type DriveItem,
} from "~/lib/mock-data";
import { getFileIcon } from "~/lib/file-icons";

type Props = {
  parentId?: string | null;
  files?: DriveItem[];
};

const FileTable: FC<Props> = ({ parentId = "root", files: filesProp }) => {
  const router = useRouter();
  // Use provided files or fetch by parentId
  const files = filesProp ?? getFilesByParentId(parentId);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleFileClick = (file: DriveItem) => {
    if (file.type === "folder") {
      router.push(`/folder/${file.id}`);
    }
    // For other file types, you could implement preview functionality
  };

  return (
    <div className="relative overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>File size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <XCircle className="text-muted-foreground h-8 w-8" />
                  <p className="text-lg font-medium">No files found</p>
                  <p className="text-muted-foreground text-sm">
                    This folder is empty
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow
                key={file.id}
                className="group hover:bg-muted/50"
                onClick={() => handleFileClick(file)}
                style={{
                  cursor: file.type === "folder" ? "pointer" : "default",
                }}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.type)}
                    <span>{file.name}</span>
                    {file.shared && (
                      <Badge variant="outline" className="h-5 px-1">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1"
                        >
                          <path
                            d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.34 8.92l3.15 1.85M16.15 12.93l-1.73 1M7.34 16.1l3.15-1.85"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Shared
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{file.owner === "me" ? "Me" : file.owner}</TableCell>
                <TableCell>{formatDate(file.lastModified)}</TableCell>
                <TableCell>
                  {file.type === "folder" ? "--" : formatBytes(file.size ?? 0)}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={file.starred ? "text-yellow-500" : ""}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Move</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileTable;
