# Lanshare

A frontend for your FastAPI upload/download API. Drag files into Lanshare, watch
real upload progress, and pull anything back off the shared manifest.

## Setup

```bash
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at your FastAPI server
npm run dev
```

Open http://localhost:3000.

## Wiring it to your FastAPI backend

This app calls three routes on your backend, unmodified:

- `POST /upload` — multipart file upload
- `GET /public` — list of uploaded files
- `GET /download/{filename}` — file download

**You'll need to enable CORS** on the FastAPI side, since Next.js runs on a
different origin (e.g. `localhost:3000` vs `localhost:8000`):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # add your deployed frontend URL too
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## What's in the box

- `app/page.tsx` — page layout, wires the upload zone to the manifest
- `components/UploadZone.tsx` — drag-and-drop zone, upload queue, per-file
  progress bars (via `XMLHttpRequest` so real byte progress is available,
  which `fetch` can't report)
- `components/Manifest.tsx` — the file list, with search and download
- `lib/api.ts` — thin client for the three backend routes

## Notes

- The `/public` endpoint currently 404s when there are no files; the client
  treats that as an empty list rather than an error.
- Filenames aren't unique on the backend today (`shutil.copyfileobj` just
  overwrites), so re-uploading a file with the same name will silently
  replace it. Worth knowing if you plan to support many users.
