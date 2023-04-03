import React, { useState } from 'react';
// import Dropzone from 'react-dropzone';
import './ImageUploader.css';
import http from '../../api/http';

function ImageUploader() {
  const [images, setImages] = useState(Array(6).fill(null));

  const onDrop = (acceptedFiles, index) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          setImages(
            images.map((image, i) => (i === index ? blob : image)),
          );
        });
        console.log('images');
        console.log(images);
        console.log(typeof images);
      };
    };
  };

  const handleSubmit = async () => {
    console.log(images);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    console.log('formData');
    console.log(formData);
    console.log(import.meta.env.VITE_TOKEN);

    await http({
      method: 'post',
      url: '/member/img',
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
      data: formData,
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <div className="bgslate">
        <div className="text-center text">이미지를 업로드 해주세요.</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                width: 100,
                height: 200,

                border: '1px solid black',
                margin: '10px',
                borderRadius: '20px',
                cursor: 'pointer',
                backgroundColor: 'white',
              }}
              onClick={() => {
                const dropzone = document.createElement('input');
                dropzone.setAttribute('type', 'file');
                dropzone.setAttribute('accept', 'image/*');
                dropzone.onchange = (event) => {
                  const file = event.target.files[0];
                  if (file) {
                    onDrop([file], index);
                  }
                };
                dropzone.click();
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded_image_${index}`}
                  style={{
                    maxWidth: 100, maxHeight: 200, width: 100, height: 200, borderRadius: 20,
                  }}
                />
              ) : (
                <p style={{ textAlign: 'center' }}>Click to upload</p>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="border-solid border-2 rounded-md bg-white" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
