import React from 'react';
import './ChatModal.css';
import Modal from 'react-modal';
import ReportModal from './ReportModal';
import CloseBtn from '../../assets/CloseBtn.svg';

function BottomModal({ setModal, setReportModal }) {
  return (
    <div>
      <p className="flex justify-end">
        <img
          onClick={() => setModal(false)}
          src={CloseBtn}
          className="w-8 h-8"
          alt="닫기"
          aria-hidden="true"
        />
      </p>
      <div className="mx-auto flex justify-between mt-8">
        <div className="relative bg-[#A8ADE5] w-20 h-20 rounded-full ml-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            fill="currentColor"
            className="bi bi-calendar-heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
            />
          </svg>
        </div>
        <div
          onClick={() => {
            setReportModal(true);
            setModal(false);
          }}
          aria-hidden
          className="relative w-20 h-20 rounded-full mr-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5rem"
            height="5rem"
            fill="currentColor"
            className="bi bi-exclamation-circle-fill absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#364C63]"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-gray-500">
        <div className="w-20 ml-8 text-center font-sans font-semibold">
          일정
        </div>
        <div className="w-20 mr-8 text-center font-sans font-semibold">
          신고
        </div>
      </div>
    </div>
  );
}

export default BottomModal;
