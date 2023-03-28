import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function MoreInfo3() {
  const [moreinfo, setMoreInfo] = useState({
    age_min: 20,
    age_max: 25,
    height_min: 160,
    height_max: 180,
    range_min: 3,
    range_max: 80,
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

  useEffect(() => {
    console.log(moreinfo);
  }, [moreinfo]);

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
      <img
        src="/heart-step-5.svg"
        alt=""
        className="mx-auto w-48 pt-16 pb-10"
      />
      <h1 className="text-center text-2xl text-[#364C63] mb-3">
        이런 사람을 만나고 싶다!
      </h1>
      <p className="text-center text-xs text-gray-400 font-sans">
        좋은 사람을 찾기 위해 추가 정보를 넣어주세요
      </p>
      <div className="mt-14 mb-5 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">
          선호하는 상대의 나이는?
        </h3>
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
      <div className="mt-16 mb-5 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">
          선호하는 상대의 키는?
        </h3>
      </div>
      <div className="mx-10">
        <Slider
          range
          min={150}
          max={200}
          defaultValue={[160, 180]}
          marks={{
            150: 150,
            155: 155,
            160: 160,
            165: 165,
            170: 170,
            175: 175,
            180: 180,
            185: 185,
            190: 190,
            195: 195,
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
      <div className="mt-16 mb-5 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">원하는 거리는?</h3>
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
      <div className="flex justify-between mx-8 text-[#364C63] text-lg">
        <div>&lt; </div>
        <div
          aria-hidden
          onClick={() => {
            console.log('다음페이지로 이동');
          }}
        >
          &gt;
        </div>
      </div>
    </div>
  );
}

export default MoreInfo3;
