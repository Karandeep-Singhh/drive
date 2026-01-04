type BaseItem = {
  id: string;
  name: string;
  size?: number;
  shared?: boolean;
  sharedBy?: User;
  owner: string; //TODO change to User
  starred?: boolean;
  parentDirId?: string;
  lastModified?: string;
};

export type APIDirectory = BaseItem & {
  type: "Directory";
};

export type APIFile = BaseItem & {
  blobRef: string;
  type: FileType;
  capabilities: FileCapability;
};

export type FileCapability = {
  preview: boolean;
  downloadable: boolean;
  stream: boolean;
  edit: boolean;
}

export type UploadFilePayload = {
  file: File;
  parentDirId?: string;
};

export type FileType =
  | "Document"
  | "Spreadsheet"
  | "Presentation"
  | "Image"
  | "Pdf"
  | "Video"
  | "Audio"
  | "File"
  | "Archive"
  | "Code";

export type DriveItem = APIFile | APIDirectory;

export const isFile = (item: DriveItem): item is APIFile => {
  return item.type !== "Directory";
};

export type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};
