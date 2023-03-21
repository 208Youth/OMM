import io
import os
from google.cloud import vision
from google.cloud.vision_v1 import types

#  환경정보의 경로를 절대경로로 해야 실행 위치가 달라도 오류가 나지 않는다.
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './ocr-origin-4d4cec7ffdde.json'
# Instantiates a client
client = vision.ImageAnnotatorClient()

# Gets a list of filenames in the "book_img" directory

filenames = os.listdir('./images')

for filename in filenames:
    path = os.path.join('./images', filename)

    # Loads the image into memory
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    # Creates a Vision API Image object
    image = types.Image(content=content)

    # Performs text detection on the image
    response = client.text_detection(image=image)
    texts = response.text_annotations
    print(texts)

    # Writes the text to a file
    # with open('./book_txt/'+filename[0:-4]+'.txt', "w") as f:
    #     f.write(texts[0].description)