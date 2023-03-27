import React, { useState, useEffect } from 'react';

function MoreInfo2() {
  const [moreinfo, setMoreInfo] = useState({
    drinking_style: '',
    smoking_style: '',
    military: '',
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
      <h1 className="text-center text-2xl text-[#364C63] mb-3">더 많은 정보</h1>
      <p className="text-center text-xs text-gray-400 font-sans">
        좋은 사람을 찾기 위해 추가 정보를 넣어주세요
      </p>
      <div className="mt-8 mb-3 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">
          평소에 어느 정도 술을 마시나요?
        </h3>
        <div className="grid grid-rows-3 grid-flow-col">
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  drinking_style: e.target.value,
                }));
              }}
              id="drink1"
              type="radio"
              name="drink"
              value="NOT"
              className="peer/drink1"
            />
            <label
              htmlFor="drink1"
              className="peer-checked/drink1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              안함
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  drinking_style: e.target.value,
                }));
              }}
              id="drink3"
              type="radio"
              name="drink"
              value="OFTEN"
              className="peer/drink3"
            />
            <label
              htmlFor="drink3"
              className="peer-checked/drink3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              자주
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  drinking_style: e.target.value,
                }));
              }}
              id="drink5"
              type="radio"
              name="drink"
              value="ONLY_FRIENDS"
              className="peer/drink5"
            />
            <label
              htmlFor="drink5"
              className="peer-checked/drink5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              친구들 만날때만
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  drinking_style: e.target.value,
                }));
              }}
              id="drink2"
              type="radio"
              name="drink"
              value="SOMETIMES"
              className="peer/drink2"
            />
            <label
              htmlFor="drink2"
              className="peer-checked/drink2:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              가끔
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  drinking_style: e.target.value,
                }));
              }}
              id="drink4"
              type="radio"
              name="drink"
              value="EVERYDAY"
              className="peer/drink4"
            />
            <label
              htmlFor="drink4"
              className="peer-checked/drink4:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              매일
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  drinking_style: e.target.value,
                }));
              }}
              id="drink6"
              type="radio"
              name="drink"
              value="STOPPING"
              className="peer/drink6"
            />
            <label
              htmlFor="drink6"
              className="peer-checked/drink6:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              금주 중
            </label>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-3 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">
          흡연은 하시나요?
        </h3>
        <div className="grid grid-rows-2 grid-flow-col">
          <div className="mr-20">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  smoking_style: e.target.value,
                }));
              }}
              id="smoke1"
              type="radio"
              name="smoke"
              value="NOT"
              className="peer/smoke1"
            />
            <label
              htmlFor="smoke1"
              className="peer-checked/smoke1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              안함
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  smoking_style: e.target.value,
                }));
              }}
              id="smoke3"
              type="radio"
              name="smoke"
              value="OFTEN"
              className="peer/smoke3"
            />
            <label
              htmlFor="smoke3"
              className="peer-checked/smoke3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              자주
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  smoking_style: e.target.value,
                }));
              }}
              id="smoke5"
              type="radio"
              name="smoke"
              value="SOMETIMES"
              className="peer/smoke5"
            />
            <label
              htmlFor="smoke5"
              className="peer-checked/smoke5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              가끔
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  smoking_style: e.target.value,
                }));
              }}
              id="smoke2"
              type="radio"
              name="smoke"
              value="STOPPING"
              className="peer/smoke2"
            />
            <label
              htmlFor="smoke2"
              className="peer-checked/smoke2:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              금연 중
            </label>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-20 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">
          병역 관련사항을 선택해주세요.
        </h3>
        <div className="grid grid-rows-2 grid-flow-col">
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  military: e.target.value,
                }));
              }}
              id="military1"
              type="radio"
              name="military"
              value="NONE"
              className="peer/military1"
            />
            <label
              htmlFor="military1"
              className="peer-checked/military1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              해당사항 없음
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  military: e.target.value,
                }));
              }}
              id="military3"
              type="radio"
              name="military"
              value="COMPLETE"
              className="peer/military3"
            />
            <label
              htmlFor="military3"
              className="peer-checked/military3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              군필
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  military: e.target.value,
                }));
              }}
              id="military5"
              type="radio"
              name="military"
              value="EXEMPT"
              className="peer/military5"
            />
            <label
              htmlFor="military5"
              className="peer-checked/military5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              면제
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  military: e.target.value,
                }));
              }}
              id="military2"
              type="radio"
              name="military"
              value="YET"
              className="peer/military2"
            />
            <label
              htmlFor="military2"
              className="peer-checked/military2:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              미필
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-8 text-[#364C63] text-lg">
        <div>&lt; </div>
        <div>&gt;</div>
      </div>
    </div>
  );
}

export default MoreInfo2;
