import React, { useState } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';
import FaceId from '../../assets/FaceId.svg';
import './FaceRecogModal.css';

function FaceRecogModal() {
  const [completed, setBtn] = useState(false);
  const [camera, setCamera] = useState(false);

  
  // 얼굴 인증 버튼 누른후 인식이 되면 버튼 변경
  return (
    <div className="face-recog-modal">
      <p className="face-recog-close-box">
        <img src={CloseBtn} className="face-recog-close" alt="닫기" />
      </p>
      <p className="face-recog-title">
        얼굴
        <br />
        인증
      </p>
      {!camera && (
        <img
          onClick={() => {
            console.log('카메라 시작');
            setCamera(true)
          }}
          aria-hidden="true"
          src={FaceId}
          className="w-60 h-60 mx-auto mt-8"
          alt="아이콘"
        />
      )}
      <button className={completed ? 'btn-active' : 'btn-inactive'}>인증 완료</button>
    </div>
  );
}

export default FaceRecogModal;
