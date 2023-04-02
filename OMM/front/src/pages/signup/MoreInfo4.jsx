import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MoreInfo4({setStep}) {
  const [moreinfo, setMoreInfo] = useState({
    contact_style: '',
    drinking_style: '',
    smoking_style: '',
  });
  const prev = ()=> {
    setStep(3);
  }
  const next = () => { 
    if (
      moreinfo.contact_style && 
      moreinfo.drinking_style && 
      moreinfo.smoking_style){
        setStep(5)
      } else {
        alert('모든 정보를 입력해주세요!');
      }
  }
  async function sendMyInfo() {
    await axios({
      method: 'post',
      url: '/api/member/info',
      data: '내 정보들 리덕스에서 가져와서 보낼거임',
      // headers: {
      //   Authorization: token,
      // },
    })
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function sendPreferInfo() {
    await axios({
      method: 'post',
      url: '/api/member/filtering',
      data: '선호 정보들 리덕스에서 가져와서 보낼거임',
      // headers: {
      //   Authorization: token,
      // },
    })
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log(moreinfo);
  }, [moreinfo]);

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
      <img
        src="/heart-step-6.svg"
        alt=""
        className="mx-auto w-48 pt-16 pb-10"
      />
      <h1 className="text-center text-2xl text-[#364C63] mb-3">
        이런 사람을 만나고 싶다!
      </h1>
      <p className="text-center text-xs text-gray-400 font-sans">
        좋은 사람을 찾기 위해 추가 정보를 넣어주세요
      </p>
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          좋아하는 연락 스타일은?
        </h3>
        <div className="grid grid-rows-3 grid-flow-col">
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  contact_style: e.target.value,
                }));
              }}
              id="contact1"
              type="radio"
              name="contact"
              value="NONE"
              className="peer/contact1"
            />
            <label
              htmlFor="contact1"
              className="peer-checked/contact1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              상관없음
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  contact_style: e.target.value,
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
                  contact_style: e.target.value,
                }));
              }}
              id="contact5"
              type="radio"
              name="contact"
              value="PREFER_FACECALL"
              className="peer/contact5"
            />
            <label
              htmlFor="contact5"
              className="peer-checked/contact5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              영상통화가 좋아요
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  contact_style: e.target.value,
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
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  contact_style: e.target.value,
                }));
              }}
              id="contact4"
              type="radio"
              name="contact"
              value="PREFER_MSG"
              className="peer/contact4"
            />
            <label
              htmlFor="contact4"
              className="peer-checked/contact4:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              카톡 자주하는 편
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  contact_style: e.target.value,
                }));
              }}
              id="contact6"
              type="radio"
              name="contact"
              value="PREFER_OFFLINE"
              className="peer/contact6"
            />
            <label
              htmlFor="contact6"
              className="peer-checked/contact6:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              만나는 게 좋아요
            </label>
          </div>
        </div>
      </div>
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          좋아하는 음주 스타일은?
        </h3>
        <div className="grid grid-rows-2 grid-flow-col">
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
              value="NONE"
              className="peer/drink1"
            />
            <label
              htmlFor="drink1"
              className="peer-checked/drink1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              상관없음
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
              value="PREFER_YES"
              className="peer/drink3"
            />
            <label
              htmlFor="drink3"
              className="peer-checked/drink3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              잘 마셨으면 좋겠다
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
              value="PREFER_NO"
              className="peer/drink5"
            />
            <label
              htmlFor="drink5"
              className="peer-checked/drink5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              안 마셨으면 좋겠다
            </label>
          </div>
        </div>
      </div>
      <div className="mt-8 mb-14 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          흡연 여부를 알려주세요.
        </h3>
        <div className="grid grid-rows-2 grid-flow-col">
          <div>
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
              value="NONE"
              className="peer/smoke1"
            />
            <label
              htmlFor="smoke1"
              className="peer-checked/smoke1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              상관없음
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
              value="PREFER_YES"
              className="peer/smoke3"
            />
            <label
              htmlFor="smoke3"
              className="peer-checked/smoke3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              했으면 좋겠다
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
              value="PREFER_NO"
              className="peer/smoke5"
            />
            <label
              htmlFor="smoke5"
              className="peer-checked/smoke5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              안 했으면 좋겠다
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-8 text-[#364C63] text-lg">
        <button
            type="button"
            aria-hidden
            onClick={() => {prev()}}
          >
            &lt;
          </button>
          <button
            type="button"
            aria-hidden
            onClick={() => {
              sendMyInfo()
              sendPreferInfo()
              next()
            }}
          >
            &gt;
        </button>
      </div>
    </div>
  );
}

export default MoreInfo4;
