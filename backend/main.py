from fastapi import FastAPI,File,UploadFile,HTTPException,status,APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os
import shutil
from pathlib import Path


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

@api_router.post('/upload',name="upload_file")
async def handle_uploads(file: UploadFile = File(...)):
    file_path = os.path.join(public_dir, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "saved_path": file_path
    }


@api_router.get('/public',name="public_files")
async def get_public():
    path = Path(public_dir)
    files = [f.name for f in path.iterdir() if f.is_file()]
    if len(files)<1:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="no uploaded files"
        )
    
    data = {
        "count":len(files),
        'files':[
            file for file in files
        ]
    }
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