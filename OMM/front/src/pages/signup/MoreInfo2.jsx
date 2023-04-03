import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moreInfo2 } from '../../store/userSlice';

function MoreInfo2({ setStep }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [moreinfo, setMoreInfo] = useState({
    my_drinking_style: '',
    my_smoking_style: '',
    my_contact_style: '',
  });
  const prev = () => {
    setStep(1);
  };
  const next = () => {
    if (
      moreinfo.my_drinking_style &&
      moreinfo.my_smoking_style &&
      moreinfo.my_contact_style
    ) {
      setStep(3);
    } else {
      alert('모든 정보를 입력해주세요!');
    }
  };
  const sendInfo = () => {
    const info = {
      my_drinking_style: moreinfo.my_drinking_style,
      my_smoking_style: moreinfo.my_smoking_style,
      my_contact_style: moreinfo.my_contact_style,
    };
    console.log(info);
    dispatch(moreInfo2(info));
  };
  useEffect(() => {
    console.log(moreinfo);
    console.log(user);
  }, [moreinfo]);

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
      <img
        src="/heart-step-2.svg"
        alt=""
        className="mx-auto w-48 pt-16 pb-10"
      />
      <h1 className="text-center text-2xl text-[#364C63] mb-3">더 많은 정보</h1>
      <p className="text-center text-xs text-gray-400 font-sans">
        좋은 사람을 찾기 위해 추가 정보를 넣어주세요
      </p>
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          당신의 연락 스타일은?
        </h3>
        <div className="grid grid-rows-3 grid-flow-col">
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_contact_style: e.target.value,
                }));
              }}
              id="contact1"
              type="radio"
              name="contact"
              value="PREFER_MSG"
              className="peer/contact1"
            />
            <label
              htmlFor="contact1"
              className="peer-checked/contact1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              카톡 자주하는 편
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_contact_style: e.target.value,
                }));
              }}
              id="contact3"
              type="radio"
              name="contact"
              value="PREFER_CALL"
              className="peer/contact3"
            />
            <label
              htmlFor="contact3"
              className="peer-checked/contact3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              전화가 좋아요
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_contact_style: e.target.value,
                }));
              }}
              id="contact5"
              type="radio"
              name="contact"
              value="PREFER_OFFLINE"
              className="peer/contact5"
            />
            <label
              htmlFor="contact5"
              className="peer-checked/contact5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              만나는게 좋아요
            </label>
          </div>
          <div className="ml-2">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_contact_style: e.target.value,
                }));
              }}
              id="contact2"
              type="radio"
              name="contact"
              value="NOT_MSG"
              className="peer/contact2"
            />
            <label
              htmlFor="contact2"
              className="peer-checked/contact2:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              카톡 안하는 편
            </label>
          </div>
          <div className="ml-2">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_contact_style: e.target.value,
                }));
              }}
              id="contact4"
              type="radio"
              name="contact"
              value="PREFER_FACECALL"
              className="peer/contact4"
            />
            <label
              htmlFor="contact4"
              className="peer-checked/contact4:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              영상통화가 좋아요
            </label>
          </div>
        </div>
      </div>
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          평소에 어느 정도 술을 마시나요?
        </h3>
        <div className="grid grid-rows-3 grid-flow-col">
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_drinking_style: e.target.value,
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
                  my_drinking_style: e.target.value,
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
                  my_drinking_style: e.target.value,
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
                  my_drinking_style: e.target.value,
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
                  my_drinking_style: e.target.value,
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
                  my_drinking_style: e.target.value,
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
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          흡연은 하시나요?
        </h3>
        <div className="grid grid-rows-2 grid-flow-col">
          <div className="mr-20">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  my_smoking_style: e.target.value,
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
                  my_smoking_style: e.target.value,
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
                  my_smoking_style: e.target.value,
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
                  my_smoking_style: e.target.value,
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
      <div className="flex justify-between mx-8 text-[#364C63] text-lg">
        <button
          type="button"
          aria-hidden
          onClick={() => {
            prev();
          }}
        >
          &lt;
        </button>
        <button
          type="button"
          aria-hidden
          onClick={() => {
            next();
            sendInfo();
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default MoreInfo2;
