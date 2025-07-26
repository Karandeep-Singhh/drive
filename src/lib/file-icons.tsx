import {
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType2,
  Folder,
  Film,
  Music,
  FileArchive,
  FileCode,
  PresentationIcon,
} from "lucide-react";
import type { FileType } from "~/service/types";

export function getFileIcon(type: FileType) {
  switch (type) {
    case "directory":
      return <Folder className="h-4 w-4 text-blue-500" />;
    case "document":
      return <FileText className="h-4 w-4 text-blue-600" />;
    case "spreadsheet":
      return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
    case "presentation":
      return <PresentationIcon className="h-4 w-4 text-orange-600" />;
    case "image":
      return <FileImage className="h-4 w-4 text-purple-600" />;
    case "pdf":
      return <FileType2 className="h-4 w-4 text-red-600" />;
    case "video":
      return <Film className="h-4 w-4 text-pink-600" />;
    case "audio":
      return <Music className="h-4 w-4 text-yellow-600" />;
    case "archive":
      return <FileArchive className="h-4 w-4 text-gray-600" />;
    case "code":
      return <FileCode className="h-4 w-4 text-cyan-600" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
}

export function getFileColor(type: FileType): string {
  switch (type) {
    case "directory":
      return "text-blue-500";
    case "document":
      return "text-blue-600";
    case "spreadsheet":
      return "text-green-600";
    case "presentation":
      return "text-orange-600";
    case "image":
      return "text-purple-600";
    case "pdf":
      return "text-red-600";
    case "video":
      return "text-pink-600";
    case "audio":
      return "text-yellow-600";
    case "archive":
      return "text-gray-600";
    case "code":
      return "text-cyan-600";
    default:
      return "text-gray-500";
  }
}
