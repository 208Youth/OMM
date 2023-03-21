import React from 'react';
import './Cert.css';

function Cert() {
  return (
    <div className="w-80">
      <div className="cert-title">CC24</div>
      <div className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>대학교 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>회사 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>소득 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>부동산 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>건강검진서</div>
        <div className="cert-point"> &gt;</div>
      </div>
      <div className="flex justify-between ml-8 py-1 border-b-2 border-b-gray-200">
        <div>자격증 인증</div>
        <div className="cert-point"> &gt;</div>
      </div>
    </div>
  );
}

export default Cert;
