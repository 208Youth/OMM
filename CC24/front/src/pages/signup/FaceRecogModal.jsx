import React, { useState } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';
import FaceId from '../../assets/FaceId.svg';
import './FaceRecogModal.css';
import axios from 'axios';

function FaceRecogModal(props) {
  const [completed, setBtn] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imgfile, setFile] = useState(null);

  const encodeFileToBase64 = (fileBlob) => {
    // 파일명 변경(회원이름 가져올것)
    let editFile = null;
    editFile = new File([fileBlob], '변경.jpg', { type: fileBlob.type });
    // 파일명 변경된 파일을 저장
    setFile(editFile);
    // 업로드한 이미지 보여주기
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    const faceidicon = document.getElementById('faceidicon');
    faceidicon.className = 'hidden';
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        setBtn(true);
        resolve();
      };
    });
  };

  async function sendImg() {
    // axios로 fastapi 에 이미지 보내기
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/photo',
      data: {
        file: imgfile,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res);
        console.log('이미지를 보냈습니다.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 얼굴 인증 버튼 누른후 인식이 되면 버튼 변경
  return (
    <div className="flex-col mx-auto">
      <p className="flex ml-64">
        <img onClick={() => props.setFaceModal(false)} src={CloseBtn} className="w-8 h-8" alt="닫기" />
      </p>
      <p className="text-3xl text-left ml-2 mt-2 leading-relaxed">
        얼굴
        <br />
        인증
      </p>
      <label htmlFor="imginput">
        <img
          aria-hidden="true"
          src={FaceId}
          id="faceidicon"
          className="w-60 h-60 mx-auto mt-8"
          alt="아이콘"
        />
      </label>
      <input
        id="imginput"
        type="file"
        accept="image/*"
        required
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <div className="preview">
        {imageSrc && <img src={imageSrc} className="w-60 h-60 mx-auto mt-8" alt="preview-img" />}
      </div>
      <button
        onClick={() => {
          sendImg();
        }}
        className={completed ? 'btn-active' : 'btn-inactive'}
      >
        인증 완료
      </button>
    </div>
  );
}

export default FaceRecogModal;
