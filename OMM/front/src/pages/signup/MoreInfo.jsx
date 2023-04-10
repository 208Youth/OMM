import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Modal from 'react-modal';
import './MoreInfo.css';
import { useDispatch, useSelector } from 'react-redux';
import { HttpProxy } from 'vite';
import Kakaomap from './Kakaomap';
import http from '../../api/http';
import { moreInfo1 } from '../../store/userSlice';

function MoreInfo({ setStep }) {
  const token = localStorage.getItem('accesstoken');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user.nickname);
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
    } else {
      // alert('모든 정보를 입력해주세요!');
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
    console.log(info);
    dispatch(moreInfo1(info));
  };
  console.log(user);
  const [modalIsOpen, setIsOpen] = useState(false);

  async function sendMyInfo() {
    const myInfo = {
      nickname: '박성완',
      lat: 10,
      lng: 10,
      height: 170,
      contact_style: 'NOT_MSG ',
      drinking_style: 'NOT',
      smoking_style: 'NOT',
      military: 'COMPLETE',
      pet: 'DOG',
      MBTI: 'INFP',
    };
    console.log('보낼 내정보', myInfo);
    await http({
      method: 'post',
      url: '/member/info',
      data: myInfo,
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        // console.log(user);
        console.log(err);
      });
  }

  async function sendPreferInfo() {
    const myFav = {
      age_min: 20,
      age_max: 25,
      height_min: 150,
      height_max: 170,
      range_min: 0,
      range_max: 10000,
      contact_style: 'NONE',
      drinking_style: 'NONE',
      smoking_style: 'NONE',
      military: 'NONE',
    };
    console.log('보낼 선호정보', myFav);
    await http({
      method: 'post',
      url: '/member/filtering',
      data: myFav,
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const openModal = () => {
    setIsOpen(true);
  };

  // const afterOpenModal = () => {
  //   subtitle.style.color = '#f00';
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

  // const onChangeHandler = (e) => {
  //   setMoreInfo(() => {
  //     return {
  //     ...moreinfo,
  //       [e.target.name]: e.target.value,
  //     };
  //   })
  // }
  useEffect(() => {
    console.log(moreinfo);
  }, [moreinfo]);

  // useEffect(() => {
  //   console.log(user);
  //   document.getElementById('nickname').value = user.nickname;
  //   document.getElementById('height').value = user.height;
  //   document.getElementById('highschool').value = user.highschool;
  //   setMoreInfo((prev) => ({
  //     ...prev,
  //     lat: user.lat,
  //     lng: user.lng,
  //   }));
  //   // document.getElementByName('military').value = user.military;
  // }, []);
  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
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
            // value = { moreinfo.nickname }
            // onChange={ onChangeHandlerId }
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
          // value = { moreinfo.height }
          // onChange={ onChangeHandlerId }
          className="w-20 h-10 font-sans font-semibold text-[#364C63] bg-white border-2 border-[#f59fb277] focus:border-[#F094A7] placeholder-[#f59fb277] text-sm text-center rounded-3xl block p-2.5 drop-shadow-md"
        />
        <span className="self-center ml-4 text-[#364C63] font-sans font-semibold">
          cm
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          sendInfo();
          sendMyInfo();
          sendPreferInfo();
        }}
        className="w-20 h-10 rounded-3xl bg-[#F59FB1] text-white font-sans font-semibold text-sm drop-shadow-md hover:bg-white hover:border-[#F59FB1] hover:border-2 hover:text-[#F59FB1]"
      >
        스킵
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
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
          // value = { moreinfo.highschool }
          // onChange={ onChangeHandlerId }
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
              // checked={moreinfo.military === 'NONE'}
              // onChange={onChangeHandler}
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
              // checked={moreinfo.military === 'COMPLETE'}
              // onChange={onChangeHandler}
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
              // checked={moreinfo.military === 'EXEMPT'}
              // onChange={onChangeHandler}
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
              // checked={moreinfo.military === 'YET'}
              // onChange={ onChangeHandler }
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
