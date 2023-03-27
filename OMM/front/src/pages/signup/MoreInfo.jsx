import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './MoreInfo.css';
import Kakaomap from './Kakaomap';

function MoreInfo() {
  const [moreinfo, setMoreInfo] = useState({
    nickname: '',
    height: '',
    location: '',
    highschool: '',
    contact_style: '',
  });
  // let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  // const afterOpenModal = () => {
  //   subtitle.style.color = '#f00';
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

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
      <div className="mt-8 mb-6 mx-8">
        <label
          htmlFor="nickname"
          className="block mb-2 text-[#364C63] text-base"
        >
          닉네임
        </label>
        <input
          onBlur={(e) => {
            setMoreInfo((prevInfo) => ({
              ...prevInfo,
              nickname: e.target.value,
            }));
          }}
          type="text"
          id="nickname"
          className="font-sans text-[#364C63] font-semibold tracking-wide bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#F59FB1] text-sm rounded-3xl block w-full p-2.5 drop-shadow-md"
          placeholder="닉네임을 입력해주세요"
        />
        {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
            <span className="font-medium">Well done!</span> Some success
            message.
          </p> */}
      </div>
      <div className="mb-6 mx-8 flex">
        <span className="font-medium text-[#364C63] mr-5 self-center text-base">
          키
        </span>
        <input
          onBlur={(e) => {
            if (isNaN(e.target.value)) {
              alert('숫자를 입력해주세요');
              e.target.value = '';
            }
            setMoreInfo((prevInfo) => ({
              ...prevInfo,
              height: Math.round(e.target.value),
            }));
          }}
          type="text"
          placeholder="키"
          className="w-20 h-10 font-sans font-semibold text-[#364C63] bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#F59FB1] text-sm text-center rounded-3xl block p-2.5 drop-shadow-md"
        />
        <span className="self-center ml-4 text-[#364C63] font-sans font-semibold">
          cm
        </span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="KakaomapModal"
        overlayClassName="KakaomapOverlay"
        ariaHideApp={false}
      >
        <Kakaomap setModal={closeModal} />
      </Modal>
      <div className="mb-6 mx-8 flex">
        <h3 className="font-medium text-[#364C63] mr-5 self-center text-base">
          위치
        </h3>
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
          className="w-20 h-10 rounded-3xl bg-[#F59FB1] text-white font-sans font-semibold text-sm drop-shadow-md"
        >
          확인
        </button>
      </div>
      <div className="mb-6 mx-8 flex">
        <span className="font-medium text-[#364C63] mr-5 self-center text-base">
          고등학교
        </span>
        <input
          onBlur={(e) => {
            setMoreInfo((prevInfo) => ({
              ...prevInfo,
              highschool: e.target.value,
            }));
          }}
          type="text"
          placeholder="싸피"
          className="w-20 h-10 font-sans font-semibold text-[#364C63] bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#F59FB1] text-sm text-center rounded-3xl block p-2.5 drop-shadow-md"
        />
        <span className="self-center ml-4 text-[#364C63] font-sans font-semibold">
          고등학교
        </span>
      </div>
      <div className="mb-3 mx-8">
        <h3 className="text-[#364C63] block mb-2 text-base">
          당신의 연락 스타일은?
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
          <div className="ml-2">
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
      <div className="flex justify-between mx-8 text-[#364C63] text-lg">
        <div>&lt; </div>
        <div>&gt;</div>
      </div>
    </div>
  );
}

export default MoreInfo;
