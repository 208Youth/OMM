from typing import Union
import os
import uuid
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from identification import detect_text_uri, detect_text
from identification import plus2

# uvicorn main:app --reload
# app = FastAPI(root_path="/api/fast")
app = FastAPI()
origins = [

    "*"  # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
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

# class Inputdata(BaseModel):
#     inputname: str
#     inputyear: int
#     inputmonth: int


# @app.post("/api/fast/idenimg")
# # async def upload_photo(file: UploadFile, pay: Inputdata):
# async def upload_photo(inputname: str = Form(...), inputyear: int = Form(...), inputmonth: int = Form(...), inputgender: str = Form(...), file: UploadFile = Form(...)):
# # async def upload_photo(file: UploadFile = Form(...)):

#     # return {"filename": filename}
#     # return {"filename": file.filename}
#     # return detect_text('./iden_img')
#     # return {file, inputgender, inputname, inputyear, inputmonth,}
#     return detect_text(file, inputname, inputyear, inputmonth, inputgender)


@app.post("/api/fast/idenimg")
# async def upload_photo(file: UploadFile, pay: Inputdata):
async def upload_photo(inputname: str = Form(...), inputday: int = Form(...), inputyear: int = Form(...), inputmonth: int = Form(...), inputgender: str = Form(...), file: UploadFile = Form(...)):
# async def upload_photo(file: UploadFile = Form(...)):
    UPLOAD_DIR = "./iden_img"  # 이미지를 저장할 서버 경로
    content = await file.read()
    filename = f"{str(uuid.uuid4())}.jpg"  # uuid로 유니크한 파일명으로 변경
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    # return {"filename": filename}
    # return {"filename": file.filename}
    # return detect_text('./iden_img')
    return detect_text('./iden_img', inputday, inputname, inputyear, inputmonth, inputgender)



@app.get('/')
def index():
    # return detect_text_uri('https://ifh.cc/g/yfWH3y.jpg')
    return detect_text('./iden_img')


@app.post('/plus')
async def index(num: int):
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

# 얼굴 정보 올리기


@app.post("/photo")
async def upload_photo(file: UploadFile):
    UPLOAD_DIR = "./knowns"  # 이미지를 저장할 서버 경로

    content = await file.read()
    filename = f"{file.filename}"  # 파일명 변경
    with open(os.path.join(UPLOAD_DIR, filename), "wb") as fp:
        fp.write(content)  # 서버 로컬 스토리지에 이미지 저장 (쓰기)

    return {"filename": filename}

# 얼굴 이미지 불러오기


@app.get("/get/photo/{name}")
async def get_photo(name: str):
    file_path = f'./knowns/{name}.jpg'
    return FileResponse(path=file_path, filename=name)
