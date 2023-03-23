import React from 'react';

function CertModal({ cert, isClose }) {
  const requireSearch = ['대학교', '자격증', '회사'];
  return (
    <div>
      {requireSearch.includes(cert) && (
        <div>
          <p onClick={() => isClose(true)} aria-hidden="true">
            X
          </p>
          <div>{`${cert} 인증`}</div>
          <div>
            <div>
              <label
                htmlFor="name"
                className="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {cert}
              </label>
              <input
                type="text"
                id="name"
                className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`${cert} 검색`}
              />
            </div>
          </div>
        </div>
      )}
      {!requireSearch.includes(cert) && (
        <div>
          <p onClick={() => isClose(true)} aria-hidden="true">
            X
          </p>
          <div>{cert === '건강검진서' ? '건강검진서' : `${cert} 인증`}</div>
          <div>인증서 바로 불러오기</div>
        </div>
      )}
    </div>
  );
}

export default CertModal;
