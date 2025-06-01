export type FileType =
  | "directory"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "image"
  | "pdf"
  | "video"
  | "audio"
  | "archive"
  | "code";

export interface DriveItem {
  id: number;
  name: string;
  type: FileType;
  size?: number;
  owner: string;
  lastModified?: string;
  starred?: boolean;
  parentDirId?: number;
  shared?: boolean;
}

// Storage quota mock data
export const storageQuota = {
  total: 15 * 1024 * 1024 * 1024, // 15GB
  used: 3.7 * 1024 * 1024 * 1024, // 3.7GB
};

// Mock Drive Data
export const MOCK_DRIVE_DATA: DriveItem[] = [];

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Get files by parent folder ID

// Search files by name
export function searchFiles(query: string) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return MOCK_DRIVE_DATA.filter((item) =>
    item.name.toLowerCase().includes(lowerQuery),
  );
}
