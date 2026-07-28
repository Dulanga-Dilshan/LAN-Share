from fastapi import FastAPI,File,UploadFile,HTTPException,status,APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
import shutil
from pathlib import Path
from services import get_files
import aiofiles


app = FastAPI(root_path="")
api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

public_dir = 'public'
os.makedirs(public_dir,exist_ok=True)

@api_router.post('/upload', name="upload_file")
async def handle_uploads(file: UploadFile = File(...)):
    file_path = os.path.join(public_dir, file.filename)
    chunk_size = 1024 * 1024 * 4 #4MB
    
    async with aiofiles.open(file_path, "wb") as buffer:
        while chunk := await file.read(chunk_size):
            await buffer.write(chunk)
            
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "saved_path": file_path
    }


@api_router.get('/public',name="public_files")
async def get_public():
    data = get_files(public_dir)
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="files not found"
        )
    return data

@api_router.get('/download/{filename}',name="download_files")
async def handle_download(filename:str):
    file_path=os.path.join(public_dir,filename)
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="file not found"
        )

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/octet-stream"
    )


app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run(
        app="main:app",
        host="0.0.0.0",
        reload=True,
        port=8000
    )