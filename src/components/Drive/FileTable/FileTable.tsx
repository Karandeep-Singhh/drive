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
import { formatBytes } from "~/lib/utils";
import { getFileIcon } from "~/lib/file-icons";
import { deleteFile, downloadFile } from "~/service/fileService";
import { isFile, type APIFile, type DriveItem } from "~/service/types";
import { deleteDir } from "~/service/dirService";
import { on } from "events";

type Props = {
    tableData: DriveItem[];
    onDelete: () => void
};

const FileTable: FC<Props> = ({ tableData, onDelete }) => {
    const router = useRouter();

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    const handleItemClick = (file: DriveItem) => {
        if (file.type === "directory") {
            router.push(`/folder/${file.id}`);
        }
        // For other file types, you could implement preview functionality
    };

    const handleDownload = (file: DriveItem) => () => {
        downloadFile((file as any).blobRef);
    }

    const handleDelete = (file: DriveItem) => {
        if (isFile(file)) {
            deleteFile(file.blobRef).then(onDelete);
        } else {
            deleteDir(file.id).then(onDelete);
        }
    }

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
                    {tableData.length === 0 ? (
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
                        tableData.map((file) => (
                            <TableRow
                                key={file.type + "_" + file.id}
                                className="group hover:bg-muted/50"
                                onClick={() => handleItemClick(file)}
                                style={{
                                    cursor: file.type === "directory" ? "pointer" : "default",
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
                                <TableCell>{file.owner}</TableCell>
                                <TableCell>{file.lastModified ? formatDate(new Date(file.lastModified)) : "--"}</TableCell>
                                <TableCell>
                                    {file.type === "file"
                                        ? formatBytes(file.size as number ?? 0)
                                        : "--"}
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center gap-2">
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
                                                <DropdownMenuItem onClick={handleDownload(file)}>Download</DropdownMenuItem>
                                                <DropdownMenuItem>Share</DropdownMenuItem>
                                                <DropdownMenuItem>Move</DropdownMenuItem>
                                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(file)}>
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
