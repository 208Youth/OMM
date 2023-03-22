import React from 'react';

function CertModal({ cert, isClose }) {
  const requireSearch = ['대학교 인증', '자격증 인증', '회사 인증'];
  return (
    <div>
      {requireSearch.includes(cert) && (
        <div>
          <p onClick={() => isClose(true)} aria-hidden="true">
            X
          </p>
          <div>{cert}</div>
          <div>검색 자동완성기능</div>
        </div>
      )}
      {!requireSearch.includes(cert) && (
        <div>
          <p onClick={() => isClose(true)} aria-hidden="true">
            X
          </p>
          <div>{cert}</div>
          <div>인증서 바로 불러오기</div>
        </div>
      )}
    </div>
  );
}

export default CertModal;
