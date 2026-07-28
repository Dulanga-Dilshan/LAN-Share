"use client";

import { useCallback, useEffect, useState } from "react";
import UploadDock from "@/components/UploadDock";
import Manifest from "@/components/Manifest";
import { fetchManifest } from "@/lib/api";

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchManifest();
      setFiles(data.files);
      setError(null);
    } catch {
      setError("Can't reach the dock. Check the API is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
      <header className="mb-10 flex items-start justify-between gap-4 border-b border-steel-600 pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel-500">
            Receiving dock
          </p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-paper sm:text-5xl">
            Depot
          </h1>
        </div>
        <div className="mt-1 rotate-3 select-none rounded-sm border-2 border-yellow px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-yellow">
          Open · 24/7
        </div>
      </header>

      <section aria-labelledby="upload-heading" className="mb-12">
        <h2 id="upload-heading" className="sr-only">
          Send a file in
        </h2>
        <UploadDock onUploaded={refresh} />
      </section>

      <section aria-labelledby="manifest-heading">
        <Manifest files={files} loading={loading} error={error} />
      </section>

      <footer className="mt-14 border-t border-steel-600 pt-4 text-center font-mono text-[11px] text-steel-600">
        Files are held on the dock's shared shelf — anyone with the link can pull them.
      </footer>
    </main>
  );
}
