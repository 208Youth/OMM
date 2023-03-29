/* eslint-disable */

import axios from 'axios';
import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './CertModal.css';
import CloseBtn from '../../assets/CloseBtn.svg';

function CertModal({ cert, info, isClose }) {
  const requireSearch = ['대학교', '자격증', '회사'];
  const [select, setSelect] = useState('');
  const [certResult, setCertResult] = useState('');
  const infos = info.data.list;

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

  const localData = JSON.parse(localStorage.getItem('DID'))

  async function requestCert(api) {
    let credentialName = '';
    if (api === '대학교') {
      credentialName = 'UniversityCredential';
    } else if (api === '자격증') {
      credentialName = 'certificate';
    } else if (api === '회사') {
      credentialName = 'job';
    } else if (api === '소득') {
      credentialName = 'income';
    } else if (api === '부동산') {
      credentialName = 'estate';
    } else if (api === '건강검진서') {
      credentialName = 'health';
    }
    await axios({
      method: 'post',
      url: `http://localhost:4424/did/credential`,
      data: {
        holderDid: `did:ethr:goerli:${localData.identifier}`,
        vpJwt: "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsZUhBaU9qRTJPREkzTlRjMU9USXNJblpqSWpwN0lrQmpiMjUwWlhoMElqcGJJbWgwZEhCek9pOHZkM2QzTG5jekxtOXlaeTh5TURFNEwyTnlaV1JsYm5ScFlXeHpMM1l4SWwwc0luUjVjR1VpT2xzaVZtVnlhV1pwWVdKc1pVTnlaV1JsYm5ScFlXd2lMQ0pRWlhKemIyNWhiRWxrUTNKbFpHVnVkR2xoYkNKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUp3WlhKemIyNWhiRWx1Wm04aU9uc2libUZ0WlNJNkl1cTVnT3ljcE91dnVDSXNJbUpwY25Sb1pHRjBaU0k2SWpFNU9Ua3RNVEV0TVRZaUxDSm5aVzVrWlhJaU9pSkdSVTFCVEVVaWZYMTlMQ0p6ZFdJaU9pSmthV1E2WlhSb2NqcG5iMlZ5YkdrNk1IZ3dNMlJtT0dVMU5HRXpNR1V6T1RBMlpESTBNMlEzTkRBeVl6VTVZamd5WWpWa09EVTBNakl6WW1FellXVTVOamxsWVRJelpESmpNVEppT0dSaE5EbGpOV1VpTENKcGMzTWlPaUprYVdRNlpYUm9janBuYjJWeWJHazZNSGd3TXpBM1pqUmtPRFUzTVdSa056WmpOakZqTUdJMVl6aGxaV1ppT0RBMU4yVTRORGxqWWpjd1pUSXdNV014WWpCa016TXhaV1U1Tnpaa09UVXpOMkkzTTJJaWZRLng5Qnd6bFpjSDhTd21NeXJDbzdVZFdpNUIzZW1WSldaZWJ0RHd6ZGlJNldsd1drSW9BVW56dC12SmxxVnZnOFo0amZNYTRnR3BZM3JWUnhiNlFCQjJBQSJdfSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4MDNkZjhlNTRhMzBlMzkwNmQyNDNkNzQwMmM1OWI4MmI1ZDg1NDIyM2JhM2FlOTY5ZWEyM2QyYzEyYjhkYTQ5YzVlIn0.aaQ-BH_yEonZanA95Afb2yRGHbNMLfpXwymvPYywWRr3Iq8fl8qmAWdT-97btV21jNNDgA1XBTccqZM5_rIa5wA",
        credentialName: credentialName,
        id: select.id
      },
    })
      .then((res) => {
        console.log(res);
        setCertResult(res);
        const VC = {
          credentialName: res.data.vpJwt
        }
        localStorage.setItem('VC',[])
      })
      .catch((err) => {
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
              <div className="truncate ...">
                발급할 인증서 :
                {' '}
                {select.name}
              </div>
              <button
                className="btn-cert"
                onClick={() => {
                  requestCert(cert);
                }}
              >
                요청
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
