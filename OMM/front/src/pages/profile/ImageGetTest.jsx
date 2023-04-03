import React, { useEffect, useState } from 'react';
import http from '../../api/http';

function ImageGetTest() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    http
      .get('/member/1')
      .then(({ data }) => {
        console.log(data);
        console.log(data.profileimgs);
        setImages([...data.profileimgs]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getBlobs = (img) => {
    const byteArray = new Uint8Array(img);
    const base64String = btoa(
      byteArray.reduce((data, byte) => data + String.fromCharCode(byte), ''),
    );
    return `data:image/png;base64,${base64String}`;
  };
  return (
    <div>
      <img src={getBlobs(images[1])} />
      <img src={getBlobs(images[2])} />
      <img src={getBlobs(images[3])} />
      {/* <img
        src={`data:image/png;base64,${btoa(
          String.fromCharCode(URL.createObjectURL(getBlobs(images[2]))),
        )}`}
      /> */}

      {images.map((byteArray, index) => (
        <img
          key={index}
          src={`data:image/png;base64,${byteArray}`}
          alt={`image${index}`}
        />
      ))}
    </div>
  );
}
export default ImageGetTest;
