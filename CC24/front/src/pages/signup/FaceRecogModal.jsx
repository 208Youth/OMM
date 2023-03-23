import React, { useState } from 'react';
import axios from 'axios';
import CloseBtn from '../../assets/CloseBtn.svg';
import FaceId from '../../assets/FaceId.svg';
import './FaceRecogModal.css';

function FaceRecogModal({ setFaceModal, name, setFaceComplete }) {
  const [completed, setBtn] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imgfile, setFile] = useState(null);

  const encodeFileToBase64 = (fileBlob) => {
    // 파일명 변경(회원이름 가져올것)
    let editFile = null;
    editFile = new File([fileBlob], '{name}.jpg', { type: fileBlob.type });
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
    setFaceComplete(true)
    console.log(faceComplete)
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
        setFaceModal(false);
        setFaceComplete(true)
      })
      .catch((err) => {
        console.log(err);
        setFaceComplete(true)
      });
  }

  // 얼굴 인증 버튼 누른후 인식이 되면 버튼 변경
  return (
    <div className="flex-col mx-auto">
      <p className="flex justify-end">
        <img
          onClick={() => setFaceModal(false)}
          src={CloseBtn}
          className="w-8 h-8"
          alt="닫기"
          aria-hidden="true"
        />
      </p>
      <p className="text-3xl text-left ml-2 mt-2 leading-relaxed">
        얼굴
        <br />
        인증
      </p>
      <h4 className='ml-3 mt-5'>마스크를 벗은 정면 사진을 올려주세요.</h4>
      <label htmlFor="imginput">
        <img
          aria-hidden="true"
          src={FaceId}
          id="faceidicon"
          className="max-w-xs mx-auto mt-3"
          alt="아이콘"
        />
      </label>
      <input
        id="imginput"
        capture="camera"
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
        {imageSrc && (
          <img src={imageSrc} className="max-w-xs max-h-xs mt-3 px-3 mx-auto" alt="preview-img" />
        )}
      </div>
      <div className="flex">
        <button
          onClick={() => {
            sendImg();
          }}
          className={completed ? 'btn-active' : 'btn-inactive'}
        >
          인증 완료
        </button>
      </div>
    </div>
  );
}

export default FaceRecogModal;
