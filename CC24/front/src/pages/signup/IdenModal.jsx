// import React, { useState } from 'react';
// import CloseBtn from '../../assets/CloseBtn.svg';
// import './index.css';
// import './FaceRecogModal.css';
// import http from '../api/fastapi';

// function Result() {
//   return (
//     <div>
//       <div>
//         <span>이름</span>
//         <span>이름값</span>
//         {/* <span>{이름값}</span> */}
//       </div>
//     </div>
//   );
// }

// function IdenModal() {
//   const [imageSrc, setImageSrc] = useState('');

//   const encodeFileToBase64 = (fileBlob) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(fileBlob);
//     return new Promise((resolve) => {
//       reader.onload = () => {
//         setImageSrc(reader.result);

//         resolve();
//         const url = await fileOrBlobToUrl(imageSrc);
//       };
//     });
//   };

//   return (
//     <div className="flex-col w-80 mx-auto">
//       <p className="flex">
//         <img src={CloseBtn} className="w-8 h-8 ml-auto mt-2" alt="닫기" />
//       </p>
//       <p className="text-3xl text-left ml-9 leading-relaxed">
//         본인
//         <br />
//         확인
//       </p>

//       <div>
//         {/* <img src="/public/upload.png" alt="Upload" /> */}
//       </div>
//       {!imageSrc && (
//       <label htmlFor="imginput">
//         <div className="fileinput" />
//       </label>
//       )}
//       <input
//         // className="fileinput"
//         id="imginput"
//         type="file"
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           encodeFileToBase64(e.target.files[0]);
//           http
//             .post('/ocr');
//         }}
//       />
//       <div className="preview">
//         {imageSrc
//         && <img src={imageSrc} alt="preview-img" />}

//       </div>
//       <div>
//         {imageSrc && Result()}
//       </div>
//     </div>
//   );
// }

// export default IdenModal;

// =======================

import React, { useState, useEffect } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';
import './index.css';
import './FaceRecogModal.css';
// import fastapi from '../../api/fastapi.js';
import axios from 'axios';

function Result() {
  return (
    <div>
      <div>
        <span>이름</span>
        <span>이름값</span>
        {/* <span>{이름값}</span> */}
      </div>
    </div>
  );
}

function IdenModal() {
  const [imageSrc, setImageSrc] = useState('');
  const [imgfile, setFile] = useState('');

  // fastapi의 idening를 실행시키기 위한 코드
  async function sendImg() {
    console.log(imgfile);
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/idenimg',
      data: {
        // 데이터의 파일부분에 문제가 있는 것 같다.
        file: imgfile,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log('fastapi로이미지를 보냈습니다.');
      })
      .catch((err) => {
        console.log(err);
        console.log('fastapi로 이미지를 보내는데 실패했습니다.');
      });
  }
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);
    setFile(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);

        resolve();
      };
    });
  };
  // 데이터가 변경되면 재렌더링 되게 하는 코드
  useEffect(() => {
    sendImg();
  }, [imgfile]);
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    await encodeFileToBase64(file);

    // fastapi/iden_img에 이미지를 저장하는 코드를 써야한다.
    const formData = new FormData();
    formData.append('file', file);
    // const { data } = await fastapi.get('/');

    // fastapi.post('/idenimg', { file: imgfile });
    // const { data } = await fastapi.post('/ocr');

    // console.log(data); // 처리 결과 출력
    // const { data } = await fastapi.post('/ocr', { path });
  };

  return (
    <div className="flex-col w-80 mx-auto">
      <p className="flex">
        <img src={CloseBtn} className="w-8 h-8 ml-auto mt-2" alt="닫기" />
      </p>
      <p className="text-3xl text-left ml-9 leading-relaxed">
        본인
        <br />
        확인
      </p>

      <div>
        {/* <img src="/public/upload.png" alt="Upload" /> */}
      </div>
      {!imageSrc && (
        <label htmlFor="imginput">
          <div className="fileinput" />
        </label>
      )}
      <input
        id="imginput"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
      <div>{imageSrc && <Result />}</div>
    </div>
  );
}

export default IdenModal;
