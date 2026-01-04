import { useEffect, useState, type FC } from "react";
import { getFilePreview } from "~/service/fileService";
import type { APIFile } from "~/service/types";

type Props = {
  file: APIFile;
};

const PdfViewer: FC<Props> = ({ file }) => {
  const [localPdfUrl, setLocalPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFilePreview(file.id)
      .then((data) => {
        const blob = new Blob([data], { type: "application/pdf" });
        setLocalPdfUrl(window.URL.createObjectURL(blob));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <>Loading..</>;
  if (!localPdfUrl) return <>Failed to load</>

  return <iframe src={localPdfUrl} className="h-full w-full border-none" />

};

export default PdfViewer;
