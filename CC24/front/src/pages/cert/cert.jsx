import React, { useState, useEffect } from 'react';
import './Cert.css';
import Modal from 'react-modal';
import CertModal from './CertModal';

function Cert() {
  const [modal, setModal] = useState(false);
  const [cert, setCert] = useState('');

  useEffect(() => {
    if (modal) {
      console.log('모달 열림');
    } else {
      console.log('모달 닫힘');
    }
  }, [modal]);
  return (
    <div className="w-80">
      <div className="cert-title">CC24</div>
      <Modal isOpen={modal} onRequestClose={() => setModal(false)} ariaHideApp={false}>
        <CertModal
          cert={cert}
          isClose={(res) => {
            if (res) {
              setModal(false);
            }
          }}
        />
      </Modal>
      <div onClick={() => { setCert('대학교 인증'); setModal(true); }} aria-hidden="true" className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>대학교 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div onClick={() => { setCert('회사 인증'); setModal(true); }} aria-hidden="true" className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>회사 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div onClick={() => { setCert('소득 인증'); setModal(true); }} aria-hidden="true" className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>소득 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div onClick={() => { setCert('부동산 인증'); setModal(true); }} aria-hidden="true" className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>부동산 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div onClick={() => { setCert('건강검진서'); setModal(true); }} aria-hidden="true"className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>건강검진서</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div onClick={() => { setCert('자격증 인증'); setModal(true); }} aria-hidden="true" className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>자격증 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
    </div>
  );
}

export default Cert;
