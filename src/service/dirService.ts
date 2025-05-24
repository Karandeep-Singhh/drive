import { getData, http } from "./http";
import type { APIDirectory } from "~/service/types";

export const getAllDirUnder = (dirId?: number) => {
  const queryParam = dirId ? `?parentDirId=${dirId}` : "";
  return http.get<APIDirectory[]>(`/v1/directories${queryParam}`).then(getData);
};

export const getAllDirs = () => {
  return http.get<APIDirectory[]>(`/v1/directories/all`).then(getData);
};

export const createDir = (newDirName: string, parentDirId?: number) => {
  return http
    .post<APIDirectory>("/v1/directories", {
      name: newDirName,
      parentDirectoryId: parentDirId,
    })
    .then(getData);
};
