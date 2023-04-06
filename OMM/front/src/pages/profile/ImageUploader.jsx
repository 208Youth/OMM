import React, { useState } from 'react';
import './ImageUploader.css';
import http from '../../api/http';
import CloseBtn from '../../assets/CloseBtn.svg';

function ImageUploader({ setModal }) {
  const [images, setImages] = useState(Array(6).fill(null));
  const token = localStorage.getItem('accesstoken');

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
          setImages(images.map((image, i) => (i === index ? blob : image)));
        });
        console.log('images');
        console.log(images);
        console.log(typeof images);
      };
    };
  };

  const handleSubmit = async () => {
    console.log('이미지배열', images);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
      console.log(image);
    });

    await http({
      method: 'put',
      url: '/member/img',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    }).then((response) => {
      console.log(response.data);
      location.reload();
    });
  };

  return (
    <div>
      <p className="flex justify-end">
        <img
          onClick={() => setModal(false)}
          src={CloseBtn}
          className="w-8 h-8"
          alt="닫기"
          aria-hidden="true"
        />
      </p>
      <div className="font-medium text-[#364C63] mb-3">프로필 이미지</div>
      <div className="text-xs text-gray-400 mb-3 font-sans">
        10MB 미만의 파일만 올려주세요.
      </div>
      <div className="overflow-x-scroll uploadimg-scroll mt-5">
        <div className="flex flex-row w-fit">
          {images.map((image, index) => (
            <div0
              key={index}
              className={
                image
                  ? 'flex w-28 h-56 m-3 cursor-pointer bg-opacity-25 rounded-2xl shadow-lg'
                  : 'flex w-28 h-56 m-3 cursor-pointer bg-opacity-25 border-2 border-[#364C63] rounded-2xl shadow-lg'
              }
              onClick={() => {
                const img = document.createElement('input');
                img.setAttribute('type', 'file');
                img.setAttribute('accept', 'image/*');
                img.onchange = (event) => {
                  const file = event.target.files[0];
                  if (file) {
                    onDrop([file], index);
                  }
                };
                img.click();
              }}
              aria-hidden
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded_image_${index}`}
                  className="rounded-2xl object-cover"
                />
              ) : (
                <div className="text-center my-auto font-sans text-[#364C63]">
                  Click to upload
                </div>
              )}
            </div0>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setModal(false);
          handleSubmit();
        }}
        className="bg-[#364C63] text-white hover:bg-white hover:text-[#364C63] hover:border-[#364C63] hover:border-2 w-full mt-5 h-10 rounded-3xl drop-shadow-md font-sans font-semibold"
      >
        완료
      </button>
    </div>
  );
}

export default ImageUploader;
