/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import { useSelector } from 'react-redux';
import { EthrDID } from 'ethr-did';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper';
import ommapi from '../../api/ommapi';

function VP() {
  // const certList = useSelector((state) => state.user.cert);
  const [certList, setCertList] = useState([]);
  const VCs = JSON.parse(localStorage.getItem('VC'));
  const iden = JSON.parse(localStorage.getItem('keypair')).identifier;
  const pk = JSON.parse(localStorage.getItem('keypair')).privateKey;
  const ethrDidOnGoerliNamed = new EthrDID({
    identifier: iden,
    privateKey: pk,
    chainNameOrId: 'goerli',
  });

  const getName = async (e) => {
    if (e === 'UniversityCredential') {
      return '대학교';
    } else if (e === 'CertificateCredential') {
      return '자격증';
    } else if (e === 'JobCredential') {
      return '직장';
    } else if (e === 'IncomeCredential') {
      return '소득';
    } else if (e === 'EstateCredential') {
      return '부동산';
    } else if (e === 'HealthCredential') {
      return '건강검진서';
    }
  };
  useEffect(() => {
    const certKeys = [];
    const vcLength = VCs == null ? 0 : VCs.length;
    for (let i = 0; i < vcLength; i++) {
      getName(Object.keys(VCs[i])[0]).then((name) => certKeys.push(name));
    }
    setCertList(certKeys);
    console.log(certKeys);
  }, []);

  const getVP = async (e) => {
    console.log(e);
    let vc = [];
    let credentialName = '';
    if (e === '대학교') {
      credentialName = 'UniversityCredential';
    } else if (e === '자격증') {
      credentialName = 'CertificateCredential';
    } else if (e === '회사') {
      credentialName = 'JobCredential';
    } else if (e === '소득') {
      credentialName = 'IncomeCredential';
    } else if (e === '부동산') {
      credentialName = 'EstateCredential';
    } else if (e === '건강검진서') {
      credentialName = 'HealthCredential';
    }
    for (var j of VCs) {
      vc.push(j[credentialName]);
    }
    console.log(vc);
    const vpPayload = {
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation', 'PersonalIdPresentation'],
        verifiableCredential: vc,
      },
    };

    const vpJwt = await createVerifiablePresentationJwt(vpPayload, ethrDidOnGoerliNamed);
    console.log(vpJwt);
    const data = {
      holderDid: ethrDidOnGoerliNamed.did,
      vpJwt: vpJwt,
    };
    await ommapi
      .post(`/sign/certificate/${credentialName}`, data)
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex">
      <div className="mx-auto">
        <p className="text-3xl text-left ml-2 mt-2 leading-relaxed">
          인증서
          <br />
          리스트
        </p>
        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
          {certList.map((cert) => (
            <SwiperSlide className="flex-row content-start">
              <p className="flex-row text-3xl text-center flex">
                <span className="">
                  {cert}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-shield-fill-check inline ml-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
                    />
                  </svg>
                  {!(cert === '신분증') && (
                    <button
                      onClick={() => {
                        getVP(cert);
                      }}
                      type="button"
                      className="flex-row text-white bg-[#4654a3] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      인증서 가져오기
                    </button>
                  )}
                </span>
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default VP;
