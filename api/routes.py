from fastapi import APIRouter, HTTPException, status, File, UploadFile, Depends
from schemas import FileBody
from recognize import recognize

prefix_gpt = APIRouter(prefix="/api")



@prefix_gpt.post("/uploadfile", status_code=status.HTTP_200_OK)
async def get_recognition(audio_file: UploadFile = File(...)):
    recognition = await recognize(audio_file)

    return  recognition