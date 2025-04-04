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
  // Root folder
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

  // First level folders
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

  // Second level folders (inside Work Documents)
  {
    id: "folder-1-1",
    name: "Projects",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-12-08"),
    starred: false,
    parentId: "folder-1",
    shared: true,
  },
  {
    id: "folder-1-2",
    name: "Reports",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-11-20"),
    starred: false,
    parentId: "folder-1",
    shared: false,
  },

  // Second level folders (inside Personal)
  {
    id: "folder-2-1",
    name: "Financial",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-11-10"),
    starred: false,
    parentId: "folder-2",
    shared: false,
  },

  // Second level folders (inside Photos)
  {
    id: "folder-3-1",
    name: "Vacation 2023",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-09-20"),
    starred: true,
    parentId: "folder-3",
    shared: false,
  },

  // Third level folders (inside Projects)
  {
    id: "folder-1-1-1",
    name: "Project Alpha",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-12-05"),
    starred: false,
    parentId: "folder-1-1",
    shared: true,
  },

  // Files in root
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

  // Files in Work Documents
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

  // Files in Projects
  {
    id: "pres-1",
    name: "Quarterly Results.pptx",
    type: "presentation",
    size: 7.2 * 1024 * 1024, // 7.2MB
    owner: "me",
    lastModified: new Date("2023-12-12"),
    starred: false,
    parentId: "folder-1-1",
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
    parentId: "folder-1-1",
    shared: true,
  },

  // Files in Project Alpha
  {
    id: "doc-2",
    name: "Requirements.docx",
    type: "document",
    size: 1.3 * 1024 * 1024, // 1.3MB
    owner: "me",
    lastModified: new Date("2023-12-03"),
    starred: false,
    parentId: "folder-1-1-1",
    shared: true,
  },
  {
    id: "doc-3",
    name: "Architecture.docx",
    type: "document",
    size: 3.1 * 1024 * 1024, // 3.1MB
    owner: "me",
    lastModified: new Date("2023-12-01"),
    starred: false,
    parentId: "folder-1-1-1",
    shared: true,
  },

  // Files in Reports folder
  {
    id: "pdf-2",
    name: "Annual Report.pdf",
    type: "pdf",
    size: 5.8 * 1024 * 1024, // 5.8MB
    owner: "me",
    lastModified: new Date("2023-11-18"),
    starred: false,
    parentId: "folder-1-2",
    shared: false,
  },

  // Files in Financial folder
  {
    id: "sheet-2",
    name: "Personal Budget.xlsx",
    type: "spreadsheet",
    size: 0.9 * 1024 * 1024, // 0.9MB
    owner: "me",
    lastModified: new Date("2023-11-05"),
    starred: true,
    parentId: "folder-2-1",
    shared: false,
  },
  {
    id: "pdf-3",
    name: "Tax Documents.pdf",
    type: "pdf",
    size: 3.2 * 1024 * 1024, // 3.2MB
    owner: "me",
    lastModified: new Date("2023-10-20"),
    starred: false,
    parentId: "folder-2-1",
    shared: false,
  },

  // Files in Personal
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

  // Files in Photos
  {
    id: "img-1",
    name: "Mountains.jpg",
    type: "image",
    size: 3.5 * 1024 * 1024, // 3.5MB
    owner: "me",
    lastModified: new Date("2023-09-25"),
    starred: true,
    parentId: "folder-3",
    shared: false,
  },

  // Files in Vacation 2023
  {
    id: "img-2",
    name: "Beach Sunset.png",
    type: "image",
    size: 4.2 * 1024 * 1024, // 4.2MB
    owner: "me",
    lastModified: new Date("2023-07-15"),
    starred: false,
    parentId: "folder-3-1",
    shared: false,
  },
  {
    id: "img-3",
    name: "Family Photo.jpg",
    type: "image",
    size: 2.8 * 1024 * 1024, // 2.8MB
    owner: "me",
    lastModified: new Date("2023-07-16"),
    starred: true,
    parentId: "folder-3-1",
    shared: false,
  },
  {
    id: "video-2",
    name: "Beach Walk.mp4",
    type: "video",
    size: 85.6 * 1024 * 1024, // 85.6MB
    owner: "me",
    lastModified: new Date("2023-07-14"),
    starred: false,
    parentId: "folder-3-1",
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
