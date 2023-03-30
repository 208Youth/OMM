/* eslint-disable */

import axios from 'axios';
import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './CertModal.css';
import CloseBtn from '../../assets/CloseBtn.svg';
import { certInfo } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function CertModal({ cert, info, isClose }) {
  const requireSearch = ['대학교', '자격증', '회사'];
  const [select, setSelect] = useState('');
  const [certResult, setCertResult] = useState('');
  const infos = info.data.list;
  const [certProgress, setCertProgress] = useState(false);
  const dispatch = useDispatch();
  const certList = useSelector(state => state.user.cert);
  console.log(certList);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    setSelect(item);
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => (
    <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
  );

  async function requestCert(api) {
    let credentialName = '';
    if (api === '대학교') {
      credentialName = 'UniversityCredential';
    } else if (api === '자격증') {
      credentialName = 'CertificateCredential';
    } else if (api === '회사') {
      credentialName = 'JobCredential';
    } else if (api === '소득') {
      credentialName = 'IncomeCredential';
    } else if (api === '부동산') {
      credentialName = 'EstateCredential';
    } else if (api === '건강검진서') {
      credentialName = 'HealthCredential';
    }
    await axios({
      method: 'post',
      url: 'http://localhost:4424/node/did/credential',
      data: {
        // holderDid: `did:ethr:goerli:${localData.identifier}`,
        holderDid:
          'did:ethr:goerli:0x03df8e54a30e3906d243d7402c59b82b5d854223ba3ae969ea23d2c12b8da49c5e',
        vpJwt:
          'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsZUhBaU9qRTJPREkzTlRjMU9USXNJblpqSWpwN0lrQmpiMjUwWlhoMElqcGJJbWgwZEhCek9pOHZkM2QzTG5jekxtOXlaeTh5TURFNEwyTnlaV1JsYm5ScFlXeHpMM1l4SWwwc0luUjVjR1VpT2xzaVZtVnlhV1pwWVdKc1pVTnlaV1JsYm5ScFlXd2lMQ0pRWlhKemIyNWhiRWxrUTNKbFpHVnVkR2xoYkNKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUp3WlhKemIyNWhiRWx1Wm04aU9uc2libUZ0WlNJNkl1cTVnT3ljcE91dnVDSXNJbUpwY25Sb1pHRjBaU0k2SWpFNU9Ua3RNVEV0TVRZaUxDSm5aVzVrWlhJaU9pSkdSVTFCVEVVaWZYMTlMQ0p6ZFdJaU9pSmthV1E2WlhSb2NqcG5iMlZ5YkdrNk1IZ3dNMlJtT0dVMU5HRXpNR1V6T1RBMlpESTBNMlEzTkRBeVl6VTVZamd5WWpWa09EVTBNakl6WW1FellXVTVOamxsWVRJelpESmpNVEppT0dSaE5EbGpOV1VpTENKcGMzTWlPaUprYVdRNlpYUm9janBuYjJWeWJHazZNSGd3TXpBM1pqUmtPRFUzTVdSa056WmpOakZqTUdJMVl6aGxaV1ppT0RBMU4yVTRORGxqWWpjd1pUSXdNV014WWpCa016TXhaV1U1Tnpaa09UVXpOMkkzTTJJaWZRLng5Qnd6bFpjSDhTd21NeXJDbzdVZFdpNUIzZW1WSldaZWJ0RHd6ZGlJNldsd1drSW9BVW56dC12SmxxVnZnOFo0amZNYTRnR3BZM3JWUnhiNlFCQjJBQSJdfSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4MDNkZjhlNTRhMzBlMzkwNmQyNDNkNzQwMmM1OWI4MmI1ZDg1NDIyM2JhM2FlOTY5ZWEyM2QyYzEyYjhkYTQ5YzVlIn0.aaQ-BH_yEonZanA95Afb2yRGHbNMLfpXwymvPYywWRr3Iq8fl8qmAWdT-97btV21jNNDgA1XBTccqZM5_rIa5wA',
        credentialName: credentialName,
        id: select.id,
      },
    })
      .then((res) => {
        setCertProgress(false);
        let credential = {};
        credential[credentialName] = res.data.vcJwt;
        var VCs = [];
        VCs = JSON.parse(localStorage.getItem('VC')) || [];
        VCs.push(credential);
        localStorage.setItem('VC', JSON.stringify(VCs));
        let cert = {};
        cert[api] = select.name;
        dispatch(certInfo(cert));
        console.log(cert);
        console.log(certList);
      })
      .catch((err) => {
        setCertProgress(false);
        console.log('왜안되');
        console.log(err);
        setCertResult('됐다요');
      });
  }

  return (
    <div>
      {requireSearch.includes(cert) && (
        <div className="flex-col mx-auto">
          <p className="flex justify-end">
            <img
              onClick={() => {
                isClose(true);
              }}
              src={CloseBtn}
              className="w-8 h-8"
              alt="닫기"
              aria-hidden="true"
            />
          </p>
          <div>{`${cert} 인증`}</div>
          <div>
            <div className="mt-6">
              <ReactSearchAutocomplete
                items={infos}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
              />
            </div>
            <div className="flex justify-between mt-3 items-center">
              <div className="truncate ...">발급할 인증서 : {select.name}</div>
              <button
                className="btn-cert"
                onClick={() => {
                  requestCert(cert);
                  setCertProgress(true);
                }}
              >
                {!certProgress && <p>요청</p>}
                {certProgress && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {!requireSearch.includes(cert) && (
        <div className="flex-col mx-auto">
          <p className="flex justify-end">
            <img
              onClick={() => {
                isClose(true);
              }}
              src={CloseBtn}
              className="w-8 h-8"
              alt="닫기"
              aria-hidden="true"
            />
          </p>
          <div>{cert === '건강검진서' ? '건강검진서' : `${cert} 인증`}</div>
          <div>아이콘</div>
          <div className="flex mt-3 w-full justify-center">
            <button
              className="btn"
              onClick={() => {
                requestCert(cert);
              }}
            >
              인증서 요청
            </button>
          </div>
        </div>
      )}
      {certResult && (
        <div className="text-center my-20 text-xl text-[#4654A3]">
          인증서가 발급되었습니다
          <br />
          메인에서 확인하세요!
        </div>
      )}
    </div>
  );
}

export default CertModal;
