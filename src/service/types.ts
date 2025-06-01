export type APIDirectory = {
  id: number;
  name: string;
  parentDirId?: number;
  lastModified?: string;
};

export type APIFile = {
  id: number;
  name: string;
  blobRef: string;
  size?: number;
  parentDirId?: number;
  lastModified?: string;
};

export type UploadFilePayload = {
  file: File;
  parentDirId?: number;
};
