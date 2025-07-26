import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import { uploadFile } from "~/service/fileService";

type TUploadContext = {
  uploadQueue: UploadItem[];
  uploadAllPendingFiles: () => void;
  clearQueue: () => void;
  removeFile: (itemId: number) => void;
  addFilesToUpload: (files: File[], parentDirId?: string) => void;
};

export type UploadItem = {
  id: number;
  file: File;
  status: "uploading" | "error" | "success" | "pending";
  progress: number;
  error?: string;
  parentDirectoryId?: string;
};

export const UploadContext = createContext<TUploadContext>(
  {} as TUploadContext,
);

const UploadProvider: FC<PropsWithChildren> = ({ children }) => {
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);

  const addFilesToUpload = (files: File[], parentDirId?: string) => {
    const uploadItems = files.map(
      (f, index) =>
        ({
          id: uploadQueue.length + index,
          file: f,
          status: "pending",
          progress: 0,
          parentDirectoryId: parentDirId,
        }) satisfies UploadItem,
    );

    setUploadQueue((prev) => [...prev, ...uploadItems]);
  };

  const removeFile = (itemId: number) => {
    setUploadQueue((prev) => prev.filter((p) => p.id !== itemId));
  };

  const setProp = (prop: Partial<UploadItem>, itemId: number) => {
    return (prev: UploadItem[]) => {
      return prev.map((i) => {
        if (i.id === itemId) {
          return { ...i, ...prop };
        }
        return i;
      });
    };
  };

  const uploadAllPendingFiles = () => {
    const pendingFiles = uploadQueue.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) return;

    pendingFiles.forEach((item) => {
      setUploadQueue(setProp({ status: "uploading" }, item.id));

      void uploadFile(
        { file: item.file, parentDirId: item.parentDirectoryId },
        (progress) => {
          setUploadQueue(setProp({ progress }, item.id));
        },
      ).then(() => {
        setUploadQueue(setProp({ status: "success" }, item.id));
      }).catch((error: Error) => {
        setUploadQueue(setProp({ status: "error", error: error.message }, item.id));
      });
    });
  };

  const clearQueue = () => setUploadQueue([]);

  return (
    <UploadContext.Provider
      value={{
        uploadQueue,
        addFilesToUpload,
        uploadAllPendingFiles,
        removeFile,
        clearQueue,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);

export default UploadProvider;
