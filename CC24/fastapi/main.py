from typing import Union
import os
import uuid
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from identification import detect_text_uri, detect_text
from identification import plus2


app = FastAPI()

origins = [

"*" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
]

app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)



class Content(BaseModel):
    content: str

@app.post("/idenimg")
async def upload_photo(file: UploadFile):
    UPLOAD_DIR = "./iden_img"  # 이미지를 저장할 서버 경로
    
    content = await file.read()
    filename = f"{str(uuid.uuid4())}.jpg"  # uuid로 유니크한 파일명으로 변경
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    # return {"filename": filename}
    # return {"filename": file.filename}
    return detect_text('./iden_img')

@app.get('/')
def index():
    # return detect_text_uri('https://ifh.cc/g/yfWH3y.jpg')
    return detect_text('./iden_img')


@app.post('/plus')
async def   index(num: int):
    return plus2(num)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


# @app.post('/ocr')

# async def detect(uri: str):
#     result = detect_text_uri(uri)
#     print(result)

#     return result
    

@app.post('/ocr')

async def detect(path: str):
    result = detect_text(path)
    print(result)

    return result