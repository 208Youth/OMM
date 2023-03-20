import { useState } from 'react';
import './index.css';

function Singup() {
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

      <input
        className="fileinput"
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
    </div>
  );
}

export default Singup;
