import { getData, http } from "~/service/http";
import type { APIDirectory, APIFile, UploadFilePayload } from "~/service/types";
import axios from "axios";

export const getAllFilesUnderDir = (dirId?: number) => {
  const queryParam = dirId ? `?parentDirId=${dirId}` : "";
  return http.get<APIFile[]>(`/v1/files${queryParam}`).then(getData);
};

export const uploadFile = (
  payload: UploadFilePayload,
  onProgressChange: (p: number) => void,
) => {
  const formData = new FormData();
  formData.append("file", payload.file);
  if (payload.parentDirId)
    formData.append("parentDirId", `${payload.parentDirId}`);

  return http
    .post<APIFile>("/v1/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e) => {
        if (e.total) {
          const progress = Math.round((e.loaded * 100) / e.total);
          onProgressChange(progress);
        }
      },
    })
    .then(getData);
};
