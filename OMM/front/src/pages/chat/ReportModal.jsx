import React, { useState } from 'react';
import axios from 'axios';
import CloseBtn from '../../assets/CloseBtn.svg';
import UploadIcon from '../../assets/fileuploadicon.png';

function ReportModal({ setReportModal }) {
  const [imgfile, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    // 파일명 변경(회원이름 가져올것)
    let editFile = null;
    editFile = new File([fileBlob], '{name}.jpg', { type: fileBlob.type });
    // 파일명 변경된 파일을 저장
    setFile(editFile);
    // 업로드한 이미지 보여주기
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    const uploadicon = document.getElementById('uploadicon');
    uploadicon.className = 'hidden';
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  async function sendImg() {
    await axios({
      method: 'post',
      url: '',
      data: {
        file: imgfile,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res);
        setReportModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <p className="flex justify-end">
        <img
          onClick={() => setReportModal(false)}
          src={CloseBtn}
          className="w-8 h-8"
          alt="닫기"
          aria-hidden="true"
        />
      </p>
      <div className="font-medium text-[#364C63] mb-3">신고 사유</div>
      <select
        id="reasons"
        className="mx-auto bg-gray-50 border border-gray-300 text-[#364C63] text-sm font-semibold font-sans mb-6 rounded-3xl border-[#364c6375] placeholder-[#364C63] placeholder-opacity-75 focus:border-[#364C63] block w-80 p-2.5"
      >
        <option value="SEXUAL_HARASS" className="text-[#364C63] w-full">
          성희롱
        </option>
        <option value="HATE" className="w-full">
          비매너
        </option>
        <option value="FR" className="w-full">
          France
        </option>
        <option value="DE" className="w-full">
          Germany
        </option>
      </select>
      <label htmlFor="imginput">
        <img
          aria-hidden="true"
          src={UploadIcon}
          id="uploadicon"
          className="max-w-xs mx-auto my-3"
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
      {imageSrc && (
        <img
          src={imageSrc}
          className="max-w-xs max-h-xs my-3 px-3 mx-auto"
          alt="preview-img"
        />
      )}
      <div className="font-medium text-[#364C63] mb-6">상세 사유</div>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full font-sans text-sm text-[#364C63] bg-gray-50 rounded-lg border border-gray-300 focus:border-[#364C63]"
        placeholder="신고사유를 자세히 알려주세요."
      />
      <button
        type="button"
        onClick={() => {
          sendImg();
          setReportModal(false);
        }}
        className="bg-[#364C63] text-white hover:bg-white hover:text-[#364C63] hover:border-[#364C63] hover:border-2 w-full mt-5 h-10 rounded-3xl drop-shadow-md font-sans font-semibold"
      >
        완료
      </button>
    </div>
  );
}

export default ReportModal;
