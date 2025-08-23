type BaseItem = {
  id: string;
  name: string;
  size?: number;
  shared?: boolean;
  sharedBy?: User
  owner: string //TODO change to User
  starred?: boolean;
  parentDirId?: string;
  lastModified?: string;
}

export type APIDirectory = BaseItem & {
  type: "directory";
};

export type APIFile = BaseItem & {
  blobRef: string;
  type: FileType;
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

export type DriveItem = APIFile | APIDirectory
  

export const isFile = (item: DriveItem): item is APIFile  => {
  return item.type !== "directory";
};

export type User = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
}