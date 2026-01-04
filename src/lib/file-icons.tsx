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
    case "DOCUMENT":
      return <FileText className="h-4 w-4 text-blue-600" />;
    case "SPREADSHEET":
      return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
    case "PRESENTATION":
      return <PresentationIcon className="h-4 w-4 text-orange-600" />;
    case "IMAGE":
      return <FileImage className="h-4 w-4 text-purple-600" />;
    case "PDF":
      return <FileType2 className="h-4 w-4 text-red-600" />;
    case "VIDEO":
      return <Film className="h-4 w-4 text-pink-600" />;
    case "AUDIO":
      return <Music className="h-4 w-4 text-yellow-600" />;
    case "ARCHIVE":
      return <FileArchive className="h-4 w-4 text-gray-600" />;
    case "CODE":
      return <FileCode className="h-4 w-4 text-cyan-600" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
}

export function getFolderIcon() {
  return <Folder className="h-4 w-4 text-blue-500" />;
}

export function getFileColor(type: FileType): string {
  switch (type) {
    case "DOCUMENT":
      return "text-blue-600";
    case "SPREADSHEET":
      return "text-green-600";
    case "PRESENTATION":
      return "text-orange-600";
    case "IMAGE":
      return "text-purple-600";
    case "PDF":
      return "text-red-600";
    case "VIDEO":
      return "text-pink-600";
    case "AUDIO":
      return "text-yellow-600";
    case "ARCHIVE":
      return "text-gray-600";
    case "CODE":
      return "text-cyan-600";
    default:
      return "text-gray-500";
  }
}
