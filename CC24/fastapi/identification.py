import io
import os
from google.cloud import vision
from google.cloud.vision_v1 import types

import hashlib
import hmac
import base64
import json


test = 123
#  환경정보의 경로를 절대경로로 해야 실행 위치가 달라도 오류가 나지 않는다.
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './ocr-origin-4d4cec7ffdde.json'
# Instantiates a client
client = vision.ImageAnnotatorClient()

# Gets a list of filenames in the "book_img" directory

# 1 로컬사진을 분석하는 코드
def detect_text(path, inputday, inputname, inputyear, inputmonth, inputgender):
# def detect_text(path,):
    # image_extensions = ('.jpg', '.jpeg', '.png', '.bmp')  # 이미지 파일 확장자 리스트
    # filenames = os.listdir('./iden_img')  # 디렉토리 내 모든 파일 리스트

    # image_files = []  # 이미지 파일 리스트
    # for filename in filenames:
    #     if filename.endswith(image_extensions):
    #         image_files.append(filename)
    
    # image_extensions = ('.jpg', '.jpeg', '.png', '.bmp')  # 이미지 파일 확장자 리스트
    # filenames = os.listdir('./iden_img')  # 디렉토리 내 모든 파일 리스트

    # image_files = []  # 이미지 파일 리스트
    # for filename in filenames:
    #     if filename.endswith(image_extensions):
    #         image_files.append(filename)
    
    filenames = os.listdir('./iden_img')

    filename = filenames[-1]
    path = os.path.join('./iden_img', filename)

    # Loads the image into memory
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    # Creates a Vision API Image object
    image = types.Image(content=content)

    # Performs text detection on the image
    response = client.text_detection(image=image)
    texts = response.text_annotations
    doc_type = (texts[0].description)[0:5]
    name = (texts[0].description)[6:9]
    birthday = (texts[0].description)[15:21]
    gender = (texts[0].description)[22:23]
    if (gender == 1 or 3):
        gender ='MALE'
    else:
        gender

    if inputgender == '여':
        inputgender = 'FEMALE'
    else:
        inputgender = 'MALE'
    
    # print(doc_type)
    # print(name)
    # print(birthday)
    # print(gender)
    # print(inputgender)
    # print(inputname)
    # print(inputmonth)

    if len(filenames) > 0:
        last_file = os.path.join('./iden_img', filenames[-1])  # 마지막 파일의 경로
        os.remove(last_file)  # 마지막 파일 삭제
    
        
    if doc_type == '주민등록증' and \
        int(birthday[:2]) == int(inputyear) % 100 and \
        int(birthday[2:4]) == int(inputmonth) and \
        int(birthday[4:6]) == int(inputday) and \
        name == inputname and \
        inputgender == gender:

        personalId = {
            "name": name,
            "birthdate": str(inputyear) + '-' + str(birthday[2:4]) + '-' + str(birthday[4:6]),
            "gender": gender
        }

        json_string = json.dumps(personalId, separators=(",", ":"), ensure_ascii=False)
        # print(json_string)
        hashed = hmac.new("1234".encode(), json_string.encode(), hashlib.sha256)
        signature = base64.urlsafe_b64encode(hashed.digest()).decode().rstrip('=')
        # print(signature)
        return {'personalId': personalId, 'signature': signature}
    else:
        print('message: 인증 정보가 일치하지 않습니다.')
        return {'message': "인증 정보가 일치하지 않습니다.", 'valid': False}
    # for file in filenames:
    #     os.remove(os.path.join('./iden_img', file))
     
    # return {'doc_type': doc_type, 
    #         'name': name, 
    #         'birthday': birthday, 
    #         'gender': gender,  
    #         'inputday': inputday,
    #         'inputname': inputname, 
    #         'inputyear': inputyear, 
    #         'inputmonth': inputmonth, 
    #         'inputgender': inputgender,
  

            
    #         }




# # 1 로컬사진을 분석하는 코드
# def detect_text(file, inputname, inputyear, inputmonth, inputgender):
# # def detect_text(path,):
#     print('detect_text 시작!!!')
#     print(file)
#     print(type(file))
#     content = file.read()

#     # Creates a Vision API Image object
#     image = types.Image(content=content)

#     # Performs text detection on the image
#     response = client.text_detection(image=image)
#     texts = response.text_annotations
#     doc_type = (texts[0].description)[0:5]
#     name = (texts[0].description)[6:9]
#     birthday = (texts[0].description)[15:21]
#     gender = (texts[0].description)[22:23]
 
#     print(doc_type)
#     print(name)
#     print(birthday)
#     print(gender)
#     print(inputname)
#     print(inputmonth)

#     return {'doc_type': doc_type, 
#             'name': name, 
#             'birthday': birthday, 
#             'gender': gender,  
#             'inputname': inputname, 
#             'inputyear': inputyear, 
#             'inputmonth': inputmonth, 
#             'inputgender': inputgender
            
#             }
    # return {'doc_type': doc_type, 'name': name, 'birthday': birthday, 'gender': gender}

# +++++++++++++++++++++++++++++++++++++++++++++++++++++
# 1.1 로컬상의 사진 분석
# def detect_text(path):
#     """Detects text in the file."""
#     client = vision.ImageAnnotatorClient()
#     path = os.path.join('../front/src/pages/signup/tmp_img', filename)

#     with io.open(path, 'rb') as image_file:
#         content = image_file.read()

#     image = vision.Image(content=content)

#     response = client.text_detection(image=image)
#     texts = response.text_annotations
#     print('Texts:')

#     for text in texts:
#         print('\n"{}"'.format(text.description))

#         vertices = (['({},{})'.format(vertex.x, vertex.y)
#                     for vertex in text.bounding_poly.vertices])

#         print('bounds: {}'.format(','.join(vertices)))

#     if response.error.message:
#         raise Exception(
#             '{}\nFor more info on error messages, check: '
#             'https://cloud.google.com/apis/design/errors'.format(
#                 response.error.message))

# 2 인터넷 상의 사진을 분석하는 코드

def detect_text_uri(uri):
    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
  
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = uri

    response = client.text_detection(image=image)
    texts = response.text_annotations

    # print(response)
    return texts

    # print('\n"{}"'.format(texts[0].description))
    # return '\n"{}"'.format(texts[0].description)

def plus2(a):
    return a+ 2


    
    
# detect_text_uri('https://ifh.cc/g/yfWH3y.jpg')