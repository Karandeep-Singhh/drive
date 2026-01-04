"use client";
import type { FC } from "react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { getFileIcon } from "~/lib/file-icons";
import { getBaseURL } from "~/service/http";
import type { APIFile } from "~/service/types";

type Props = {
  file: APIFile;
};
const FileThumbnail: FC<Props> = ({ file }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {file.capabilities.preview && !imageError ? (
        <img
          src={getBaseURL() + "/v1/files/" + file.id + "/thumbnail"}
          height={28}
          width={28}
          alt={file.name}
          onError={() => setImageError(true)}
        />
      ) : (
        getFileIcon(file.type)
      )}
      <span>{file.name}</span>
      {file.shared && (
        <Badge variant="outline" className="h-5 px-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7.34 8.92l3.15 1.85M16.15 12.93l-1.73 1M7.34 16.1l3.15-1.85"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Shared
        </Badge>
      )}
    </div>
  );
};

export default FileThumbnail;
