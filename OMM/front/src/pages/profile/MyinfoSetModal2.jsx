// import { def } from '@vue/shared';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
// import '../../index.css';
// import CloseBtn from '../../assets/CloseBtn.svg';

import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';

function MyinfoSetModal2({ setModal }) {
  const [myinfo, setMoreInfo] = useState({
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
  const changeRange = (e) => {
    let min = e[0];
    let max = e[1];
    if (min === 1) {
      min = 3;
    } else if (min === 50) {
      min = '10';
    } else if (min === 100) {
      min = '20';
    } else if (min === 150) {
      min = '80';
    } else if (min === 200) {
      min = '100';
    } else if (min === 300) {
      min = '200';
    } else if (min === 400) {
      min = '300';
    }
    if (max === 1) {
      max = 3;
    } else if (max === 50) {
      max = '10';
    } else if (max === 100) {
      max = '20';
    } else if (max === 150) {
      max = '80';
    } else if (max === 200) {
      max = '100';
    } else if (max === 300) {
      max = '200';
    } else if (max === 400) {
      max = '300';
    }
    setMoreInfo((prevInfo) => ({
      ...prevInfo,
      range_min: min,
      range_max: max,
    }));
  };

  // const data = {
  //   height, contact_stlye, drinking_stlye, smoking_stlye, military, pet, MBTI: mbti,
  // };
  // const Changeinfo = () => {
  //   axios.put('/api/member/filtering', data).then((response) => {
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
          <div className="mx-10">
            <Slider
              range
              min={20}
              max={45}
              defaultValue={[20, 25]}
              marks={{
                20: 20,
                25: 25,
                30: 30,
                35: 35,
                40: 40,
                45: '45세',
              }}
              step={5}
              onChange={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  age_min: e[0],
                  age_max: e[1],
                }));
              }}
            />
          </div>
          <div>
            <div className="m-10">
              <Slider
                range
                min={150}
                max={200}
                defaultValue={[160, 180]}
                marks={{
                  150: 150,
                  160: 160,
                  170: 170,
                  180: 180,
                  190: 190,
                  200: '200 cm',
                }}
                step={5}
                onChange={(e) => {
                  setMoreInfo((prevInfo) => ({
                    ...prevInfo,
                    height_min: e[0],
                    height_max: e[1],
                  }));
                }}
              />
            </div>
          </div>
          <div className="mx-10 mb-24">
            <Slider
              range
              min={3}
              max={500}
              defaultValue={[3, 80]}
              marks={{
                1: 3,
                50: 10,
                100: 20,
                150: 80,
                200: 100,
                300: 200,
                400: 300,
                500: '500 km',
              }}
              step={null}
              onChange={(e) => {
                changeRange(e);
              }}
            />
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
                      setMoreInfo((prevInfo) => ({
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
                      setMoreInfo((prevInfo) => ({
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
                      setMoreInfo((prevInfo) => ({
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
            <button className="border border-black w-16 h-7 bg-white rounded-lg ">완료</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MyinfoSetModal2;
