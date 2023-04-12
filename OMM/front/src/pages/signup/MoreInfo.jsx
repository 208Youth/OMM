import React, { useState } from 'react';
import Modal from 'react-modal';
import './MoreInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import Kakaomap from './Kakaomap';
import { moreInfo1 } from '../../store/userSlice';

function MoreInfo({ setStep }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [moreinfo, setMoreInfo] = useState({
    nickname: '',
    height: 0,
    lat: '',
    lng: '',
    highschool: '',
    military: '',
  });
  const next = () => {
    if (
      user.nickname
      && user.height
      && user.lat
      && user.lng
      && user.highschool
      && user.military
    ) {
      setStep(2);
    }
  };
  const sendInfo = () => {
    const info = {
      nickname: moreinfo.nickname,
      height: moreinfo.height,
      lat: moreinfo.lat,
      lng: moreinfo.lng,
      highschool: moreinfo.highschool,
      military: moreinfo.military,
    };
    dispatch(moreInfo1(info));
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem] mx-auto">
      <img src="/heart-step-1.svg" alt="" className="mx-auto w-48 pt-16 pb-8" />
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
        <div className="flex flex-row">
          <input
            onBlur={(e) => {
              setMoreInfo((prevInfo) => ({
                ...prevInfo,
                nickname: e.target.value,
              }));
            }}
            type="text"
            id="nickname"
            className="w-full font-sans text-[#364C63] font-semibold tracking-wide bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#f59fb277] text-sm rounded-3xl block p-2.5 drop-shadow-md"
            placeholder="닉네임을 입력해주세요"
          />
        </div>
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
          id="height"
          type="text"
          placeholder="키"
          className="w-20 h-10 font-sans font-semibold text-[#364C63] bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#f59fb277] text-sm text-center rounded-3xl block p-2.5 drop-shadow-md"
        />
        <span className="self-center ml-4 text-[#364C63] font-sans font-semibold">
          cm
        </span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="KakaomapModal"
        overlayClassName="KakaomapOverlay"
        ariaHideApp={false}
      >
        <Kakaomap
          setModal={closeModal}
          location={(res) => {
            setMoreInfo((prev) => ({
              ...prev,
              lat: res.lat,
              lng: res.lng,
            }));
          }}
        />
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
          className="w-20 h-10 rounded-3xl bg-[#F59FB1] text-white font-sans font-semibold text-sm drop-shadow-md hover:bg-white hover:border-[#F59FB1] hover:border-2 hover:text-[#F59FB1]"
        >
          확인
        </button>
        {moreinfo.lat && moreinfo.lng && (
          <i className="bi bi-check-circle-fill text-[#364C63] self-center ml-3" />
        )}
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
          id="highschool"
          type="text"
          placeholder="싸피"
          className="w-20 h-10 font-sans font-semibold text-[#364C63] bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#f59fb277] text-sm text-center rounded-3xl block p-2.5 drop-shadow-md"
        />
        <span className="self-center ml-4 text-[#364C63] font-sans font-semibold">
          고등학교
        </span>
      </div>
      <div className="mt-8 mb-1 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
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
        <button type="button" aria-hidden onClick={() => {}}>
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

export default MoreInfo;
