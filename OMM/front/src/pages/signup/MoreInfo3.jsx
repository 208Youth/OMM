import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function MoreInfo3() {
  const [moreinfo, setMoreInfo] = useState({
    age_min: '20',
    age_max: '25',
    height_min: '160',
    height_max: '180',
    range_min: '3',
    range_max: '80',
  });

  useEffect(() => {
    console.log(moreinfo);
  }, [moreinfo]);

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
      <img
        src="/ommheart.png"
        alt=""
        className="mx-auto pt-[100px] pb-6 w-[8rem]"
      />
      <h1 className="text-center text-2xl text-[#364C63] mb-3">이런 사람을 만나고 싶다!</h1>
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
            20: 20, 25: 25, 30: 30, 35: 35, 40: 40, 45: '45세',
          }}
          step={5}
          onChange={(e) => {
            setMoreInfo((prevInfo) => ({
              ...prevInfo,
              age_min: e[0],
              age_max: e[1],
            }));
          }}
          // value={value}
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
          min={160}
          max={200}
          defaultValue={[160, 180]}
          marks={{
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
        <h3 className="text-[#364C63] block mb-2 text-base">
          원하는 거리는?
        </h3>
      </div>
      <div className="mx-10 mb-20">
        <Slider
          range
          min={3}
          max={500}
          defaultValue={[3, 80]}
          marks={{
            1: 3, 50: 10, 100: 20, 150: 80, 200: 100, 300: 200, 400: 300, 500: '500 km',
          }}
          step={null}
          onChange={(e) => {
            setMoreInfo((prevInfo) => ({
              ...prevInfo,
              range_min: e[0],
              range_max: e[1],
            }));
            // if (e[0] === 1 || e[1] === 1) {
            //   e[0] = 3;
            //   e[1] = 3;
            // } else if (e[0] === 50 || e[1] === 50) {
            //   e[0] = 10;
            //   e[1] = 10;
            // } else if (e[0] === 100 || e[1] === 100) {
            //   e[0] = 20;
            //   e[1] = 20;
            // } else if (e[0] === 150 || e[1] === 150) {
            //   e[0] = 80;
            //   e[1] = 80;
            // } else if (e[0] === 200 || e[1] === 200) {
            //   e[0] = 100;
            //   e[1] = 100;
            // } else if (e[0] === 300 || e[1] === 300) {
            //   e[0] = 200;
            //   e[1] = 200;
            // } else if (e[0] === 400 || e[1] === 400) {
            //   e[0] = 300;
            //   e[1] = 300;
            // }
          }}
        />
      </div>
      <div className="flex justify-between mx-8 text-[#364C63] text-lg">
        <div>&lt; </div>
        <div>&gt;</div>
      </div>
    </div>
  );
}

export default MoreInfo3;
