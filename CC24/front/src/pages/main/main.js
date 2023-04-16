/* eslint-disable */
import './Main.css';
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Main() {
  const user = useSelector((state) => state.user);
  const cert = useSelector((state) => state.user.cert);
  const [change, setChange] = useState(true);
  const contentList = [];
  let certList = [];
  let personalId = {};
  if (localStorage.getItem('IdenVC')) {
    certList.push('신분증');
    let decoded = jwt_decode(localStorage.getItem('IdenVC')).vc.credentialSubject;
    contentList.push(null);
    personalId = decoded.personalId;
  }
  if (localStorage.getItem('VC')) {
    const certs = JSON.parse(localStorage.getItem('VC'));
    certs.forEach((element) => {
      for (let [key, value] of Object.entries(element)) {
        let decoded = jwt_decode(value).vc.credentialSubject;
        let data = '';
        let cert_name = '';
        switch (key) {
          case 'UniversityCredential':
            data = decoded.university.name;
            cert_name = '대학교';
            break;
          case 'JobCredential':
            data = decoded.job.name;
            cert_name = '직업';
            break;
          case 'IncomeCredential':
            data = `${decoded.income.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
            cert_name = '소득';
            break;
          case 'EstateCredential':
            let res = 0;
            decoded.estate.estates.forEach((amount) => {
              res += amount;
            });
            data = `${res.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
            cert_name = '부동산';
            break;
          case 'HealthCredential':
            data = decoded.health.date;
            cert_name = '건강';
            break;
          case 'CertificateCredential':
            data = decoded.certificate.name;
            cert_name = '자격증';
            break;
          default:
            break;
        }
        certList.push(cert_name);
        contentList.push(data);
      }
    });
  }

  return (
    <div className="flex px-10">
      <div className="flex-col w-80 mx-auto">
        <div>
          <p
            className="text-3xl text-left ml-9 mt-20 leading-relaxed"
            style={{ marginLeft: '1rem' }}
          >
            인증서
          </p>
        </div>
        <div>
          <p className="text-3xl text-left ml-9 leading-relaxed" style={{ marginLeft: '1rem' }}>
            리스트
          </p>
          <br />
        </div>
        <div className="z-3">
          <div className="sticky">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSlideChange={() => setChange(true)}
            >
              {certList.map((cert, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => setChange(!change)}
                  className={change ? 'name' : 'description'}
                >
                  {change && (
                    <div>
                      <p className="text-3xl text-left leading-relaxed flex justify-start t-0">
                        <span className="inline">
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
                        </span>
                      </p>
                    </div>
                  )}
                  {!change && (
                    <div className="text-xl text-left leading-relaxed justify-start t-0">
                      {certList[index] == '신분증' ? (
                        <div className="m-3">
                          <img
                            src={personalId.imageUrl}
                            width="100%"
                            style={{
                              display: 'block',
                              margin: '0 auto',
                              borderRadius: '40%',
                            }}
                          />
                        </div>
                      ) : (
                        <div className="m-3 text-3xl">{contentList[index]}</div>
                      )}
                      <div className="mx-5">
                        <p className="text-2xl">
                          {personalId.name} {personalId.gender == 'FEMALE' ? '여' : '남'}
                        </p>
                        <p>{personalId.birthdate}</p>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <Navbar className="fixed z-100" />
    </div>
  );
}

export default Main;
