export type APIDirectory = {
  id: string;
  name: string;
  parentDirId?: string;
  lastModified?: string;
};

export type APIFile = {
  id: string;
  name: string;
  blobRef: string;
  size?: number;
  parentDirId?: string;
  lastModified?: string;
};

export type UploadFilePayload = {
  file: File;
  parentDirId?: string;
};

export type FileType =
  | "directory"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "image"
  | "pdf"
  | "video"
  | "audio"
  | "file"
  | "archive"
  | "code"

export type DriveItem = {
  id: string;
  name: string;
  type: FileType;
  size?: number;
  owner: string;
  lastModified?: string;
  starred?: boolean;
  parentDirId?: string;
  shared?: boolean;
}

export type User = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
}