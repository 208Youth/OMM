import io
import os
from google.cloud import vision
from google.cloud.vision_v1 import types

test = 123
#  환경정보의 경로를 절대경로로 해야 실행 위치가 달라도 오류가 나지 않는다.
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './ocr-origin-4d4cec7ffdde.json'
# Instantiates a client
client = vision.ImageAnnotatorClient()

# Gets a list of filenames in the "book_img" directory

# 1 로컬사진을 분석하는 코드
def detect_text(path):
    filenames = os.listdir('./iden_img')

    filename = filenames[0]
    path = os.path.join('./iden_img', filename)

    # Loads the image into memory
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    # Creates a Vision API Image object
    image = types.Image(content=content)

    # Performs text detection on the image
    response = client.text_detection(image=image)
    texts = response.text_annotations
    
    # print('\n"{}"'.format(texts[0].description))
    # print("{}".format(texts[0].description))
    # lines = texts.split("\n")
    # doc_type = lines[0]
    # name = lines[1].split("(")[0]
    # id_num = lines[2]
    # print(name)
    doc_type = (texts[0].description)[0:5]
    name = (texts[0].description)[6:9]
    birthday = (texts[0].description)[15:21]
    gender = (texts[0].description)[22:23]
    print(doc_type)
    print(name)
    print(birthday)
    print(gender)
    for file in filenames:
        os.remove(os.path.join('./iden_img', file))
    return {'doc_type': doc_type, 'name': name, 'birthday': birthday, 'gender': gender}


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