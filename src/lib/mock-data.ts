export type FileType =
  | "folder"
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
  id: string;
  name: string;
  type: FileType;
  size?: number;
  owner: string;
  lastModified: Date;
  starred: boolean;
  parentId: string | null;
  shared: boolean;
}

// Storage quota mock data
export const storageQuota = {
  total: 15 * 1024 * 1024 * 1024, // 15GB
  used: 3.7 * 1024 * 1024 * 1024, // 3.7GB
};

// Mock Drive Data
export const MOCK_DRIVE_DATA: DriveItem[] = [
  {
    id: "root",
    name: "My Drive",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-12-01"),
    starred: false,
    parentId: null,
    shared: false,
  },
  {
    id: "folder-1",
    name: "Work Documents",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-12-10"),
    starred: true,
    parentId: "root",
    shared: true,
  },
  {
    id: "folder-2",
    name: "Personal",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-11-15"),
    starred: false,
    parentId: "root",
    shared: false,
  },
  {
    id: "folder-3",
    name: "Photos",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-10-05"),
    starred: true,
    parentId: "root",
    shared: true,
  },
  {
    id: "doc-1",
    name: "Project Proposal.docx",
    type: "document",
    size: 2.5 * 1024 * 1024, // 2.5MB
    owner: "me",
    lastModified: new Date("2023-12-15"),
    starred: false,
    parentId: "folder-1",
    shared: true,
  },
  {
    id: "sheet-1",
    name: "Budget 2023.xlsx",
    type: "spreadsheet",
    size: 1.8 * 1024 * 1024, // 1.8MB
    owner: "me",
    lastModified: new Date("2023-11-28"),
    starred: true,
    parentId: "folder-1",
    shared: true,
  },
  {
    id: "pres-1",
    name: "Quarterly Results.pptx",
    type: "presentation",
    size: 7.2 * 1024 * 1024, // 7.2MB
    owner: "me",
    lastModified: new Date("2023-12-12"),
    starred: false,
    parentId: "folder-1",
    shared: false,
  },
  {
    id: "img-1",
    name: "Vacation.jpg",
    type: "image",
    size: 3.5 * 1024 * 1024, // 3.5MB
    owner: "me",
    lastModified: new Date("2023-09-25"),
    starred: true,
    parentId: "folder-3",
    shared: false,
  },
  {
    id: "img-2",
    name: "Family Photo.png",
    type: "image",
    size: 4.2 * 1024 * 1024, // 4.2MB
    owner: "me",
    lastModified: new Date("2023-07-15"),
    starred: false,
    parentId: "folder-3",
    shared: false,
  },
  {
    id: "pdf-1",
    name: "Resume.pdf",
    type: "pdf",
    size: 1.1 * 1024 * 1024, // 1.1MB
    owner: "me",
    lastModified: new Date("2023-12-01"),
    starred: false,
    parentId: "folder-2",
    shared: false,
  },
  {
    id: "archive-1",
    name: "Project Files.zip",
    type: "archive",
    size: 25.7 * 1024 * 1024, // 25.7MB
    owner: "me",
    lastModified: new Date("2023-11-10"),
    starred: false,
    parentId: "folder-1",
    shared: true,
  },
  {
    id: "video-1",
    name: "Holiday Video.mp4",
    type: "video",
    size: 158.3 * 1024 * 1024, // 158.3MB
    owner: "me",
    lastModified: new Date("2023-08-17"),
    starred: true,
    parentId: "folder-2",
    shared: false,
  },
  {
    id: "code-1",
    name: "app.tsx",
    type: "code",
    size: 0.7 * 1024 * 1024, // 0.7MB
    owner: "me",
    lastModified: new Date("2023-12-16"),
    starred: false,
    parentId: "root",
    shared: false,
  },
];

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Get files by parent folder ID
export function getFilesByParentId(parentId: string | null = "root") {
  return MOCK_DRIVE_DATA.filter((item) => item.parentId === parentId);
}

// Search files by name
export function searchFiles(query: string) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return MOCK_DRIVE_DATA.filter((item) =>
    item.name.toLowerCase().includes(lowerQuery),
  );
}

// Get starred files
export function getStarredFiles() {
  return MOCK_DRIVE_DATA.filter((item) => item.starred);
}

// Get shared files
export function getSharedFiles() {
  return MOCK_DRIVE_DATA.filter((item) => item.shared);
}
