// import { def } from '@vue/shared';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import '../../index.css';
// import CloseBtn from '../../assets/CloseBtn.svg';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';

function MyinfoSetModal2({ setModal }) {
  const [myinfo, setMyInfo] = useState({
    age_min: '',
    age_max: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    range_min: '',
    range_max: '',
    contact_style: '',
    drinking_stlye: '',
    smoking_stlye: '',

  });

  // const data = {
  //   height, contact_stlye, drinking_stlye, smoking_stlye, military, pet, MBTI: mbti,
  // };
  // const Changeinfo = () => {
  //   axios.put('/api/member/info', data).then((response) => {
  //     console.log('Success:', response);
  //   }).catch((error) => {
  //     console.log('Error:', error);
  //   });
  // };
  useEffect(() => {
    console.log(myinfo);
    // console.log(mbti);
  }, [myinfo]);

  return (
    <div className="overflow-y-auto">
      <div>
        <img
          onClick={() => setModal(true)}
          src={CloseBtn}
          alt="닫기"
          className="w-8 h-8"
          aria-hidden="true"
        />
      </div>
      <div className="">
        <h1>선호하는 상대 정보</h1>
        <div className="">
          <div className="flex justify-between m-3">
            <span>키</span>
            <span>키값</span>

          </div>
          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              음주 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NOT', 'SOMETIMES', 'OFTEN', 'ONLY_FRIENDS', 'EVERYDAY', 'STOPPING'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
                        ...prevInfo,
                        favor_drinking_style: e.target.value,
                      }));
                    }}
                    id={`drink${index + 1}`}
                    type="radio"
                    name="drink"
                    value={style}
                    className={`peer/drink${index + 1}`}
                  />
                  <label
                    htmlFor={`drink${index + 1}`}
                    className={`peer-checked/drink${index + 1}:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1`}
                  >
                    {style === 'NOT' ? '안함'
                      : style === 'SOMETIMES' ? '가끔'
                        : style === 'OFTEN' ? '자주'
                          : style === 'ONLY_FRIENDS' ? '친구들과'
                            : style === 'EVERYDAY' ? '매일'
                              : style === 'STOPPING' ? '금주 중' : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              연락 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['PREFER_MSG', 'PREFER_CALL', 'PREFER_FACECALL', 'NOT_MSG', 'PREFER_OFFLINE'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
                        ...prevInfo,
                        favor_contact_stlye: e.target.value,
                      }));
                    }}
                    id={`contact${index + 1}`}
                    type="radio"
                    name="contact"
                    value={style}
                    className={`peer/contact${index + 1}`}
                  />
                  <label
                    htmlFor={`contact${index + 1}`}
                    className={`peer-checked/contact${index + 1}:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1`}
                  >
                    {style === 'PREFER_MSG' ? '카톡러'
                      : style === 'PREFER_CALL' ? '전화'
                        : style === 'PREFER_FACECALL' ? '영상통화'
                          : style === 'NOT_MSG' ? '카톡 별로'
                            : style === 'PREFER_OFFLINE' ? '당장 만나'
                              : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              흡연 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NOT', 'SOMETIMES', 'OFTEN', 'STOPPING'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
                        ...prevInfo,
                        favor_smoking_style: e.target.value,
                      }));
                    }}
                    id={`smoke${index + 1}`}
                    type="radio"
                    name="smoke"
                    value={style}
                    className={`peer/smoke${index + 1}`}
                  />
                  <label
                    htmlFor={`smoke${index + 1}`}
                    className={`peer-checked/smoke${index + 1}:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1`}
                  >
                    {style === 'NOT' ? '비흡연러'
                      : style === 'SOMETIMES' ? '가끔'
                        : style === 'OFTEN' ? '구름과자 예술가'
                          : style === 'STOPPING' ? '금연중' : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-3">
            <button className="border border-black w-16 h-7 bg-white rounded-lg ">제출</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MyinfoSetModal2;
