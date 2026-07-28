export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value >= 100 || i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}

export function extOf(filename: string): string {
  const parts = filename.split(".");
  if (parts.length < 2) return "FILE";
  return parts[parts.length - 1].toUpperCase().slice(0, 4);
}

/** Deterministic short tracking code derived from a filename, e.g. DPT-2841. */
export function trackingCode(filename: string, index: number): string {
  let hash = 0;
  for (let i = 0; i < filename.length; i++) {
    hash = (hash * 31 + filename.charCodeAt(i)) >>> 0;
  }
  const code = (hash % 9000) + 1000 + index;
  return `DPT-${code}`;
}
