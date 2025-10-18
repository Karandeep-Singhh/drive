import { getData, http } from "~/service/http";
import type { APIDirectory, APIFile, UploadFilePayload } from "~/service/types";
import axios from "axios";

export const getAllFilesUnderDir = (dirId?: string): Promise<APIFile[]> => {
    const queryParam = dirId ? `?parentDirId=${dirId}` : "";
    return http.get<APIFile[]>(`/v1/files${queryParam}`).then((res) => getData(res));
};

export const uploadFile = (
    payload: UploadFilePayload,
    onProgressChange: (p: number) => void,
): Promise<APIFile> => {
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
        .then((res) => getData(res));
};

export const downloadFile = (blobRef: string): Promise<void> => {
    return http
        .get("/v1/files/" + blobRef, { responseType: "blob" })
        .then((res) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const header = res.headers["content-disposition"];
            let filename = "download";
            if(header) {
                const p = header.split("filename=");
                if(p.length > 1) {
                    filename = p[1].replace(/"/g, "");
                }
            }

            const href = window.URL.createObjectURL(res.data);
            const link = document.createElement("a");
            link.href = href;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(href);
        });
};

export const deleteFile = (blobRef: string): Promise<void> => {
    return http.delete("/v1/files/" + blobRef).then(() => {});
};