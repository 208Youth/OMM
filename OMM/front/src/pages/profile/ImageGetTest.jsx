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

  return (
    <div>
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
