export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export interface DepotFile {
  name: string;
}

export interface FileListResponse {
  count: number;
  files: string[];
}

export interface UploadResult {
  filename: string;
  content_type: string;
  saved_path: string;
}

/**
 * Uploads a file to the /upload endpoint using XMLHttpRequest so we get
 * real byte-level progress events (fetch cannot report upload progress).
 */
export function uploadFile(
  file: File,
  onProgress: (percent: number) => void
): { promise: Promise<UploadResult>; abort: () => void } {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append("file", file);

  const promise = new Promise<UploadResult>((resolve, reject) => {
    xhr.open("POST", `${API_BASE}/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error("Depot returned an unreadable response."));
        }
      } else {
        reject(new Error(`Upload rejected at the dock (status ${xhr.status}).`));
      }
    };

    xhr.onerror = () => reject(new Error("Connection to the dock dropped."));
    xhr.onabort = () => reject(new Error("Upload cancelled."));

    xhr.send(formData);
  });

  return { promise, abort: () => xhr.abort() };
}

export async function fetchManifest(): Promise<FileListResponse> {
  const res = await fetch(`${API_BASE}/public`, { cache: "no-store" });
  if (res.status === 404) {
    return { count: 0, files: [] };
  }
  if (!res.ok) {
    throw new Error("Could not reach the dock.");
  }
  return res.json();
}

export function downloadUrl(filename: string): string {
  return `${API_BASE}/download/${encodeURIComponent(filename)}`;
}
