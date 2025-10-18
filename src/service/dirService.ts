import { getData, http } from "./http";
import type { APIDirectory } from "~/service/types";
import type { AxiosResponse } from "axios";

export const getAllDirUnder = (dirId?: string): Promise<APIDirectory[]> => {
  const queryParam = dirId ? `?parentDirId=${dirId}` : "";
  return http.get<APIDirectory[]>(`/v1/directories${queryParam}`).then((res: AxiosResponse<APIDirectory[]>) => getData(res));
};

export const getAllDirs = (): Promise<APIDirectory[]> => {
  return http.get<APIDirectory[]>(`/v1/directories/all`).then((res: AxiosResponse<APIDirectory[]>) => getData(res));
};

export const createDir = (newDirName: string, parentDirId?: string): Promise<APIDirectory> => {
  return http
    .post<APIDirectory>("/v1/directories", {
      name: newDirName,
      parentDirectoryId: parentDirId,
    })
    .then((res: AxiosResponse<APIDirectory>) => getData(res));
};

export const deleteDir = (dirId: string): Promise<void> => {
  return http.delete(`/v1/directories/${dirId}`).then(() => {});
};