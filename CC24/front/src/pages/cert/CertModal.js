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

function CertModal({ cert, info, isClose }) {
  const requireSearch = ['대학교', '자격증', '회사'];
  const [select, setSelect] = useState('');
  const [certResult, setCertResult] = useState('');
  const [infos, setInfos] = useState([]);
  const [certProgress, setCertProgress] = useState(false);
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
    setVpJwt(res)
  }
  
  useEffect(() => {
    getVP();
  });
  
  useEffect(() => {
    if (info) {
      setInfos(info.data.list)
    }
  }, [])

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
      url: 'http://localhost:4424/api/node/credential',
      data: {
        // holderDid: `did:ethr:goerli:${localData.identifier}`,
        // holderDid:
        //   'did:ethr:goerli:0x02f1c90ddd63371ae175e31542a70dc4343a79215c155a04158d54ff17ee38d669',
        // vpJwt:
        //   'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iLCJQZXJzb25hbElkUHJlc2VudGF0aW9uIl0sInZlcmlmaWFibGVDcmVkZW50aWFsIjpbImV5SmhiR2NpT2lKRlV6STFOa3N0VWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGVIQWlPakUyT0RJNU5UWXpNak1zSW5aaklqcDdJa0JqYjI1MFpYaDBJanBiSW1oMGRIQnpPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1ERTRMMk55WldSbGJuUnBZV3h6TDNZeElsMHNJblI1Y0dVaU9sc2lWbVZ5YVdacFlXSnNaVU55WldSbGJuUnBZV3dpTENKUVpYSnpiMjVoYkVsa1EzSmxaR1Z1ZEdsaGJDSmRMQ0pqY21Wa1pXNTBhV0ZzVTNWaWFtVmpkQ0k2ZXlKd1pYSnpiMjVoYkVsa0lqcDdJbTVoYldVaU9pTHNtNURzc1lUcm9Ma2lMQ0ppYVhKMGFHUmhkR1VpT2lJeE9UazJMVEV5TFRBMUlpd2laMlZ1WkdWeUlqb2lSa1ZOUVV4RkluMTlmU3dpYzNWaUlqb2laR2xrT21WMGFISTZaMjlsY214cE9qQjRNREptTVdNNU1HUmtaRFl6TXpjeFlXVXhOelZsTXpFMU5ESmhOekJrWXpRek5ETmhOemt5TVRWak1UVTFZVEEwTVRVNFpEVTBabVl4TjJWbE16aGtOalk1SWl3aWFYTnpJam9pWkdsa09tVjBhSEk2WjI5bGNteHBPakI0TURNd04yWTBaRGcxTnpGa1pEYzJZell4WXpCaU5XTTRaV1ZtWWpnd05UZGxPRFE1WTJJM01HVXlNREZqTVdJd1pETXpNV1ZsT1RjMlpEazFNemRpTnpOaUluMC53NDgtRXRJbWFzb2JVUXdXa0kyQTg2YVp4enVtSlp1ZzVXYTdiaHFzcVQ1RG04S1BmMHB2SkRvN0RlX0R1OVRUTjAxNU56a2txQ3JnOV9rMHlpS2ZxZ0EiXX0sImlzcyI6ImRpZDpldGhyOmdvZXJsaToweDAyZjFjOTBkZGQ2MzM3MWFlMTc1ZTMxNTQyYTcwZGM0MzQzYTc5MjE1YzE1NWEwNDE1OGQ1NGZmMTdlZTM4ZDY2OSJ9.h0xB7GfurIi4kEzXJVxVv04UJfrJlGl5vQLv5qTC_U4loXBVK2u3ftPCuScKX_ERqUEoepd9Qr2nZy8OKdDH5QA',
        holderDid: did,
        vpJwt: vpJwt,
        credentialName: credentialName,
        id: select.id,
      },
    })
      .then((res) => {
        setCertProgress(false);
        let credential = {};
        credential[credentialName] = res.data.vcJwt;
        console.log(credential);
        var VCs = [];
        VCs = JSON.parse(localStorage.getItem('VC')) || [];
        const certKeys = []
        for (let i = 0; i < VCs.length; i++) {
          certKeys.push(Object.keys(VCs[i])[0]);
        }
        for (var i of certKeys) {
          if (credentialName == i) {
            alert('이미 발급된 증명서입니다.')
            return
          } 
        } 
        dispatch(certInfo(api));
        VCs.push(credential);
        localStorage.setItem('VC', JSON.stringify(VCs))
        setCertResult(true)
      })
      .catch((err) => {
        setCertProgress(false);
        console.log(err);
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
                setCertProgress(true)
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
          인증서가 발급되었습니다
          <br />
          메인에서 확인하세요!
        </div>
      )}
    </div>
  );
}

export default CertModal;
