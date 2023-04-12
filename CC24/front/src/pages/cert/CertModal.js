/* eslint-disable */

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './CertModal.css';
import CloseBtn from '../../assets/CloseBtn.svg';
import { certInfo } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { EthrDID } from 'ethr-did';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import http from '../../api/nodeapi';

function CertModal({ cert, info, isClose }) {
  const requireSearch = ['대학교', '자격증', '회사'];
  const [select, setSelect] = useState('');
  const [certResult, setCertResult] = useState('');
  const [infos, setInfos] = useState([]);
  const [certProgress, setCertProgress] = useState(false);
  const [found, setFound] = useState(false);
  const dispatch = useDispatch();
  const did = JSON.parse(localStorage.getItem('DID')).did;
  console.log(did);
  const vc = useSelector((state) => state.user.idenvc);
  const iden = JSON.parse(localStorage.getItem('keypair')).identifier;
  const pk = JSON.parse(localStorage.getItem('keypair')).privateKey;
  const ethrDidOnGoerliNamed = new EthrDID({
    identifier: iden,
    privateKey: pk,
    chainNameOrId: 'goerli',
  });
  const vpPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation', 'PersonalIdPresentation'],
      verifiableCredential: vc,
    },
  };
  const [vpJwt, setVpJwt] = useState('');
  async function getVP() {
    const res = await createVerifiablePresentationJwt(vpPayload, ethrDidOnGoerliNamed);
    setVpJwt(res);
  }
  useEffect(() => {
    getVP();
  });
  useEffect(() => {
    if (info) {
      setInfos(info.data.list);
    }
  }, []);

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
    await http({
      method: 'post',
      url: '/credential',
      data: {
        vpJwt: vpJwt,
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
        const certKeys = [];
        for (let i = 0; i < VCs.length; i++) {
          certKeys.push(Object.keys(VCs[i])[0]);
        }
        for (var i of certKeys) {
          if (credentialName == i) {
            alert('이미 발급된 증명서입니다.');
            return;
          }
        }
        dispatch(certInfo(api));
        VCs.push(credential);
        localStorage.setItem('VC', JSON.stringify(VCs));
        setCertResult(true);
        setTimeout(() => {
          setCertResult(false);
        }, 3000);
      })
      .catch((err) => {
        setCertProgress(false);
        console.log(err);
        if (err.message === 'Request failed with status code 400') {
          setFound(true);
          setTimeout(() => {
            setFound(false);
          }, 3000);
        }
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
                      class="inline w-8 h-8 text-center text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          {cert === '소득' && (
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-piggy-bank text-[#4654A3]"
                viewBox="0 0 16 16"
              >
                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z" />
                <path
                  fill-rule="evenodd"
                  d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"
                />
              </svg>
            </div>
          )}
          {cert === '건강검진서' && (
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-piggy-bank text-[#4654A3]"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
                <path d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128L9.979 5.356Z" />
              </svg>
            </div>
          )}
          {cert === '부동산' && (
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-piggy-bank text-[#4654A3]"
                viewBox="0 0 16 16"
              >
                <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708L5.793 1Zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207l-4.5-4.5Z" />
              </svg>
            </div>
          )}
          <div className="flex mt-3 w-full justify-center">
            <button
              className="btn"
              onClick={() => {
                requestCert(cert);
                setCertProgress(true);
              }}
            >
              {!certProgress && <p>인증서 요청</p>}
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
      )}
      {certResult && (
        <div className="text-center my-20 text-xl text-[#4654A3]">
          인증서가 발급되었습니다.
          <br />
          메인에서 확인하세요!
        </div>
      )}
      {found && (
        <div className="text-center my-20 text-xl text-[#4654A3]">
          인증서 정보가 존재하지 않습니다.
        </div>
      )}
    </div>
  );
}

export default CertModal;
