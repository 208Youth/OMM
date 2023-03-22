import React, { useState } from 'react';
import './index.css';

function Result() {
  return (
    <div>
      <div>
        <span>이름</span>
        <span>이름값</span>
        {/* <span>{이름값}</span> */}
      </div>
      <div>
        <span>이름</span>
        <span>이름값</span>
      </div>
      <div>
        <span>이름</span>
        <span>이름값</span>
      </div>
    </div>
  );
}

function IdenModal() {
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <div>
      <div>
        <h1>본인</h1>
      </div>
      <div>
        <h1>확인</h1>
      </div>
      <div>
        {/* <img src="/public/upload.png" alt="Upload" /> */}
      </div>
      {!imageSrc && (
      <label htmlFor="imginput">
        <div className="fileinput" />
      </label>
      )}
      <input
        // className="fileinput"
        id="imginput"
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <div className="preview">
        {imageSrc
        && <img src={imageSrc} alt="preview-img" />}

      </div>
      <div>
        {imageSrc && Result()}
      </div>
    </div>
  );
}

export default IdenModal;
