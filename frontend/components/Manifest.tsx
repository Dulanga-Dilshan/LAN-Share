"use client";

import { useMemo, useState } from "react";
import { downloadUrl, type DepotFile } from "@/lib/api";
import { extOf, formatBytes, trackingCode } from "@/lib/format";

export default function Manifest({
  files,
  loading,
  error,
}: {
  files: DepotFile[];
  loading: boolean;
  error: string | null;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return files;
    const q = query.toLowerCase();
    return files.filter((f) => f.file_name.toLowerCase().includes(q));
  }, [files, query]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
          Manifest
          <span className="ml-2 font-mono text-xs font-normal text-steel-500">
            {files.length} item{files.length === 1 ? "" : "s"} on file
          </span>
        </h2>
        {files.length > 0 && (
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search manifest…"
            aria-label="Search files"
            className="focus-ring w-40 rounded-sm border border-steel-600 bg-steel-800 px-2.5 py-1.5 font-mono text-xs text-paper placeholder:text-steel-500 sm:w-56"
          />
        )}
      </div>

      {loading && (
        <div className="rounded-sm border border-steel-600 bg-steel-800/40 px-4 py-8 text-center font-mono text-xs uppercase tracking-widest text-steel-500">
          Checking the shelf…
        </div>
      )}

      {!loading && error && (
        <div className="rounded-sm border border-signal-red/40 bg-signal-red/5 px-4 py-6 text-center font-mono text-xs text-signal-red">
          {error}
        </div>
      )}

      {!loading && !error && files.length === 0 && (
        <div className="rounded-sm border border-dashed border-steel-600 px-4 py-10 text-center">
          <p className="font-display text-base uppercase tracking-wide text-steel-500">
            Nothing shared yet
          </p>
          <p className="mt-1 font-mono text-xs text-steel-600">
            Send something over and it'll show up here.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && files.length > 0 && (
        <div className="rounded-sm border border-dashed border-steel-600 px-4 py-8 text-center font-mono text-xs text-steel-500">
          No file matches “{query}”.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((file, i) => (
            <li
              key={file.file_name}
              className="ticket-edge flex flex-col gap-3 rounded-sm border border-steel-600 bg-steel-800 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="shrink-0 rounded-sm border border-steel-600 bg-steel-900 px-1.5 py-1 font-mono text-[10px] font-semibold text-yellow"
                  title={file.file_type ?? "unknown type"}
                >
                  {extOf(file.file_name)}
                </span>
                <span className="font-mono text-[11px] text-steel-500">
                  {trackingCode(file.file_name, i)}
                </span>
              </div>

              <p className="min-w-0 flex-1 break-words text-sm text-paper">
                {file.file_name}
              </p>

              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-steel-500">
                  {formatBytes(file.file_size)}
                </span>
                <a
                  href={downloadUrl(file.file_name)}
                  download={file.file_name}
                  className="focus-ring self-start rounded-sm border border-steel-600 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide text-paper transition-colors hover:border-yellow hover:text-yellow"
                >
                  Download ↓
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
