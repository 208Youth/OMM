import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import http from '../../api/http';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';

function MyinfoSetModal2({ setModal }) {
  const [myinfo, setMoreInfo] = useState({
    age_min: '',
    age_max: '',
    height_min: '',
    height_max: '',
    range_min: '',
    range_max: '',
    contact_style: '',
    drinking_style: '',
    smoking_style: '',

  });
  const token = localStorage.getItem('accesstoken');
  // const data = myinfo;

  const changeRange = (e) => {
    let min = e[0];
    let max = e[1];
    if (min === 1) {
      min = 3;
    } else if (min === 50) {
      min = 10;
    } else if (min === 100) {
      min = 20;
    } else if (min === 150) {
      min = 80;
    } else if (min === 200) {
      min = 100;
    } else if (min === 300) {
      min = 200;
    } else if (min === 400) {
      min = 300;
    }
    if (max === 1) {
      max = 3;
    } else if (max === 50) {
      max = 10;
    } else if (max === 100) {
      max = 20;
    } else if (max === 150) {
      max = 80;
    } else if (max === 200) {
      max = 100;
    } else if (max === 300) {
      max = 200;
    } else if (max === 400) {
      max = 300;
    }
    setMoreInfo((prevInfo) => ({
      ...prevInfo,
      range_min: min,
      range_max: max,
    }));
  };

  const Changeinfo = () => {
    http({
      method: 'PUT',
      url: '/member/filtering',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: myinfo,
    })
      .then((res) => {
        console.log(res);
        console.log(data);

        setModal(false);
      })
      .catch((err) => {
        alert('모든 정보를 설정해 주세요');
        console.log(err);
        console.log('담아줄 데이터', data);
      });
  };
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
          className="w-8 h-8 hover:cursor-pointer "
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
              // defaultValue={[20, 25]}
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
                if (!e[0] || !e[1]) {
                  console.log('????');
                  alert('최저, 최대 나이를 설정해주세요');
                } else {
                  setMoreInfo((prevInfo) => ({
                    ...prevInfo,
                    age_min: e[0],
                    age_max: e[1],
                  }));
                }
              }}
            />
          </div>
          <div>
            <div className="m-10">
              <Slider
                range
                min={150}
                max={200}
                // defaultValue={[160, 180]}
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
              // defaultValue={[3, 80]}
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
            <h3 className="block mb-5 text-base">
              음주 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NONE', 'PREFER_NO', 'PREFER_YES'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMoreInfo((prevInfo) => ({
                        ...prevInfo,
                        drinking_style: e.target.value,
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
                    {style === 'NONE' ? '상관없음'
                      : style === 'PREFER_NO' ? '안 마셨으면 좋겠음'
                        : style === 'PREFER_YES' ? '잘 마셨으면 좋겠음' : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="my-8 mx-8">
            <h3 className="block mb-5 text-base">
              연락 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NONE', 'PREFER_MSG', 'PREFER_CALL', 'PREFER_FACECALL', 'NOT_MSG', 'PREFER_OFFLINE'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMoreInfo((prevInfo) => ({
                        ...prevInfo,
                        contact_style: e.target.value,
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
                    {style === 'NONE' ? '상관없음'
                      : style === 'PREFER_MSG' ? '카톡 자주'
                        : style === 'PREFER_CALL' ? '전화'
                          : style === 'PREFER_FACECALL' ? '영상통화'
                            : style === 'NOT_MSG' ? '카톡 별로'
                              : style === 'PREFER_OFFLINE' ? '직접 만나'
                                : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="my-8 mx-8">
            <h3 className=" block mb-5 text-base">
              흡연 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NONE', 'PREFER_NO', 'PREFER_YES'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMoreInfo((prevInfo) => ({
                        ...prevInfo,
                        smoking_style: e.target.value,
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
                    {style === 'NONE' ? '상관없음'
                      : style === 'PREFER_NO' ? '비흡연자 선호'
                        : style === 'PREFER_YES' ? '흡연자 선호'
                          : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-3">
            <button onClick={Changeinfo} className="border border-black w-16 h-7 bg-white rounded-lg ">완료</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MyinfoSetModal2;
