from pydantic import BaseModel
from typing import Optional

class FileBody(BaseModel):
    FileName: str
    FileDesc:   Optional[str] = "Upload audio file"
    FileType: Optional[str] = "ogg"
