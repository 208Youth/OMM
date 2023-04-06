import React, { useState, useEffect } from 'react';
import http from '@/api/http';
import './ChatModal.css';
import CloseBtn from '../../assets/CloseBtn.svg';
import UploadIcon from '../../assets/fileuploadicon.png';

function ReportModal({ setReportModal, targetId }) {
  const [imgfile, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [report, setReport] = useState({
    targetId: 0,
    reason: '',
    image: '',
    state: false,
    category: 'SEXUAL_HARASS',
  });
  const token = localStorage.getItem('accessToken');
  const encodeFileToBase64 = (fileBlob) => {
    let editFile = null;
    editFile = new File([fileBlob], { type: fileBlob.type });
    setFile(editFile);
    setReport((prev) => ({
      ...prev,
      image: fileBlob,
    }));
    // 업로드한 이미지 보여주기
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    const uploadicon = document.getElementById('uploadicon');
    uploadicon.className = 'hidden mb-2';
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  async function sendReport() {
    const formData = new FormData();
    formData.append('report', JSON.stringify(report));
    formData.append('image', imgfile);
    console.log(formData);

    http({
      method: 'post',
      url: `/admin/report`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    setReport((prev) => ({
      ...prev,
      targetId,
    }));
  }, []);

  useEffect(() => {
    console.log(report);
  }, [report]);

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
      <label
        htmlFor="category"
        className="block text-sm font-medium text-[#364C63] mb-3"
      >
        신고 사유
      </label>
      <select
        id="category"
        onClick={(e) => {
          setReport((prev) => ({
            ...prev,
            category: e.target.value,
          }));
        }}
        className="mx-auto block w-full p-2 mb-6 text-sm font-sans text-[#364C63] border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#364C63] focus:border-[#364C63]"
      >
        <option value="SEXUAL_HARASS" className="font-sans">
          성희롱
        </option>
        <option value="PROMOTION" className="font-sans text-[#364C63]">
          홍보, 광고
        </option>
        <option value="THREATEN" className="font-sans text-[#364C63]">
          위협
        </option>
        <option value="HATE" className="font-sans text-[#364C63]">
          혐오
        </option>
        <option value="ETC" className="font-sans text-[#364C63]">
          기타
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
        // multiple
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
        onBlur={(e) => {
          setReport((prev) => ({
            ...prev,
            reason: e.target.value,
          }));
        }}
      />
      <button
        type="button"
        onClick={() => {
          sendReport();
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
