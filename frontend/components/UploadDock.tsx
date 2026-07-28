"use client";

import { useCallback, useRef, useState } from "react";
import { uploadFile } from "@/lib/api";
import { formatBytes, extOf } from "@/lib/format";

type Status = "queued" | "uploading" | "done" | "error";

interface QueueItem {
  id: string;
  file: File;
  progress: number;
  status: Status;
  error?: string;
  abort?: () => void;
}

export default function UploadDock({ onUploaded }: { onUploaded: () => void }) {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const startUpload = useCallback(
    (file: File) => {
      const id = `${file.name}-${file.size}-${Date.now()}-${Math.random()}`;
      setItems((prev) => [
        { id, file, progress: 0, status: "uploading" },
        ...prev,
      ]);

      const { promise, abort } = uploadFile(file, (percent) => {
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, progress: percent } : it))
        );
      });

      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, abort } : it)));

      promise
        .then(() => {
          setItems((prev) =>
            prev.map((it) =>
              it.id === id ? { ...it, status: "done", progress: 100 } : it
            )
          );
          onUploaded();
        })
        .catch((err: Error) => {
          setItems((prev) =>
            prev.map((it) =>
              it.id === id ? { ...it, status: "error", error: err.message } : it
            )
          );
        });
    },
    [onUploaded]
  );

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      Array.from(fileList).forEach(startUpload);
    },
    [startUpload]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const dismiss = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload files to the dock"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`focus-ring group relative cursor-pointer rounded-sm border-2 border-dashed p-10 text-center transition-colors sm:p-14 ${
          dragActive
            ? "border-yellow bg-yellow/5"
            : "border-steel-600 bg-steel-800/40 hover:border-steel-500"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {/* Dock door bay marks */}
        <div className="pointer-events-none absolute inset-3 rounded-sm border border-steel-600/40" />

        <div className="relative flex flex-col items-center gap-3">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            className={`transition-transform ${dragActive ? "-translate-y-1" : ""}`}
          >
            <path
              d="M22 4v22M22 4l-8 8M22 4l8 8"
              stroke="#F2B705"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 30v6a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-6"
              stroke="#5A6670"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-display text-xl font-semibold uppercase tracking-wide text-paper sm:text-2xl">
            {dragActive ? "Release to send it in" : "Drop files at the dock"}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-steel-500">
            or click to choose · any file type · multiple ok
          </p>
        </div>
      </div>

      {items.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="animate-slidein flex items-center gap-3 rounded-sm border border-steel-600 bg-steel-800 px-3 py-2.5"
            >
              <span className="font-mono text-[10px] font-semibold text-steel-500">
                {extOf(it.file.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm text-paper">{it.file.name}</p>
                  <span className="shrink-0 font-mono text-[11px] text-steel-500">
                    {formatBytes(it.file.size)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-steel-700">
                  <div
                    className={`h-full rounded-full transition-[width] duration-150 ease-out ${
                      it.status === "error" ? "bg-signal-red" : "bg-yellow"
                    }`}
                    style={{ width: `${it.status === "error" ? 100 : it.progress}%` }}
                  />
                </div>
                {it.status === "error" && (
                  <p className="mt-1 font-mono text-[11px] text-signal-red">{it.error}</p>
                )}
              </div>

              <div className="w-16 shrink-0 text-right">
                {it.status === "uploading" && (
                  <span className="font-mono text-xs text-steel-500">{it.progress}%</span>
                )}
                {it.status === "done" && (
                  <span className="font-mono text-xs font-semibold text-signal-green">
                    RECEIVED
                  </span>
                )}
                {it.status === "error" && (
                  <button
                    onClick={() => dismiss(it.id)}
                    className="focus-ring font-mono text-xs text-steel-500 underline decoration-dotted hover:text-paper"
                  >
                    dismiss
                  </button>
                )}
              </div>

              {it.status === "uploading" && it.abort && (
                <button
                  onClick={() => it.abort?.()}
                  aria-label={`Cancel upload of ${it.file.name}`}
                  className="focus-ring shrink-0 text-steel-500 hover:text-signal-red"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
