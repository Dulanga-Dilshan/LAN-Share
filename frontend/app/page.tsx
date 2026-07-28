"use client";

import { useCallback, useEffect, useState } from "react";
import UploadZone from "@/components/UploadZone";
import Manifest from "@/components/Manifest";
import { fetchManifest, type DepotFile } from "@/lib/api";

export default function Home() {
  const [files, setFiles] = useState<DepotFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchManifest();
      setFiles(data.files);
      setError(null);
    } catch {
      setError("Can't reach Lanshare. Check the API is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
      <header className="mb-10 border-b border-steel-600 pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel-500">
          Local file share
        </p>
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-paper sm:text-6xl">
          Lanshare
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-14">
        <section aria-labelledby="upload-heading" className="lg:sticky lg:top-14 lg:self-start">
          <h2 id="upload-heading" className="sr-only">
            Send a file in
          </h2>
          <UploadZone onUploaded={refresh} />
        </section>

        <section aria-labelledby="manifest-heading">
          <Manifest files={files} loading={loading} error={error} />
        </section>
      </div>

      <footer className="mt-14 border-t border-steel-600 pt-4 text-center font-mono text-[11px] text-steel-600">
        Files are stored on Lanshare's shared shelf — anyone with the link can pull them.
      </footer>
    </main>
  );
}
