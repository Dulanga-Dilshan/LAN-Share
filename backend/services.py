from pathlib import Path
import os
import mimetypes

def get_file_details(filepath:str,filename:str)->dict:
    file_path=os.path.join(filepath,filename)
    file_data = {
        "file_name":filename,
        "file_size":os.path.getsize(file_path),
        "file_type": mimetypes.guess_type(file_path)[0]
    }

    return file_data

def get_files(path:str)->dict:
    filepath = Path(path)
    files = [f.name for f in filepath.iterdir() if f.is_file()]
    if len(files)<1:
        return None

    data ={
        "count":len(files),
        'files':[
            get_file_details(path,file) for file in files
        ]
    }

    return data
