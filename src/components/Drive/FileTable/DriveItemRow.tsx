import { get } from "http";
import { MoreHorizontal, Star } from "lucide-react";
import type { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { TableCell, TableRow } from "~/components/ui/table";
import { getFileIcon, getFolderIcon } from "~/lib/file-icons";
import { formatBytes } from "~/lib/utils";
import { isFile, type DriveItem } from "~/service/types";
import FileThumbnail from "./FileThumbnail";

type Props = {
  item: DriveItem;
  onItemClick: (file: DriveItem) => void;
  onDelete: (file: DriveItem) => void;
  onDownload: (file: DriveItem) => () => void;
};
const DriveItemRow: FC<Props> = ({
  item,
  onItemClick,
  onDelete,
  onDownload,
}) => {
  const isFileItem = isFile(item);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <TableRow
      className="group hover:bg-muted/50"
      onClick={() => onItemClick(item)}
      style={{
        cursor: "pointer",
      }}
    >
      <TableCell className="font-medium">
        {isFileItem ? <FileThumbnail file={item} /> : getFolderIcon()}
      </TableCell>
      <TableCell>{item.owner}</TableCell>
      <TableCell>
        {item.lastModified ? formatDate(new Date(item.lastModified)) : "--"}
      </TableCell>
      <TableCell>
        {isFileItem ? formatBytes((item.size as number) ?? 0) : "--"}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={item.starred ? "text-yellow-500" : ""}
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
              <DropdownMenuItem onClick={onDownload(item)}>
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Move</DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(item)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default DriveItemRow;
