import { ImageResponse } from "next/og";
import { MOCK_DRIVE_DATA } from "~/lib/mock-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const folderId = params.id;
  const folder = MOCK_DRIVE_DATA.find(
    (item) => item.id === folderId && item.type === "folder",
  );

  const folderName = folder?.name ?? "Folder Not Found";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "white",
          background: "linear-gradient(to bottom, #1e293b, #0f172a)",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 50,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            style={{ marginRight: 20 }}
          >
            <path
              d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
              fill="#4F46E5"
            />
          </svg>
          <div style={{ fontSize: 70, fontWeight: "bold" }}>Drive</div>
        </div>
        <div style={{ fontSize: 40, marginTop: 20, textAlign: "center" }}>
          {folderName}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
