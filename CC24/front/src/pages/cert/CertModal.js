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

  async function requestCert(api) {
    let selectCert = '';
    if (api === '대학교') {
      selectCert = 'university';
    } else if (api === '자격증') {
      selectCert = 'certificate';
    } else if (api === '회사') {
      selectCert = 'job';
    } else if (api === '소득') {
      selectCert = 'income';
    } else if (api === '부동산') {
      selectCert = 'estate';
    } else if (api === '건강검진서') {
      selectCert = 'health';
    }
    await axios({
      method: 'get',
      url: `/api/cert/${selectCert}${select.id ? `/${select.id}` : ''}`,
      data: {
        name: '이름',
        birth_date: '0000-00-00',
      },
      headers: {
        // Authorization: token,
      },
    })
      .then((res) => {
        console.log(res);
        setCertResult(res);
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
