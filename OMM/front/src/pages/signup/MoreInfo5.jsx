import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { moreInfo5 } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function MoreInfo5({setStep}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [MBTI1, setMBTI1] = useState('');
  const [MBTI2, setMBTI2] = useState('');
  const [MBTI3, setMBTI3] = useState('');
  const [MBTI4, setMBTI4] = useState('');
  const [moreinfo, setMoreInfo] = useState({
    pet: '',
    MBTI: '',
  });
  const prev = ()=> {
    setStep(4);
  }
  const next =() => { 
    if (moreinfo.pet && 
        moreinfo.MBTI){
          setStep(6)
        } else {
          alert('모든 정보를 입력해주세요!');
        }
  }
  const sendInfo = () => {
    const info = {
      contact_style: moreinfo.contact_style,
      drinking_style: moreinfo.drinking_style,
      smoking_style: moreinfo.smoking_style,
    };
    console.log(info);
    dispatch(moreInfo5(info));
  };
  const my_info = new FormData();
  my_info.append('nickname', user.nickname);
  my_info.append('lat', user.lat);
  my_info.append('lng', user.lng);
  my_info.append('height', user.height);
  my_info.append('my_contact_style', user.my_contact_style);
  my_info.append('my_drinking_style', user.my_drinking_style);
  my_info.append('my_smoking_style', user.my_smoking_style);
  my_info.append('military', user.military);
  my_info.append('pet', user.pet);
  my_info.append('MBTI1', user.MBTI);

  const my_fav = new FormData();
  my_fav.append('age_min', user.age_min);
  my_fav.append('age_max', user.age_max);
  my_fav.append('height_min', user.height_min);
  my_fav.append('height_max', user.height_max);
  my_fav.append('range_min', user.range_min);
  my_fav.append('range_max', user.range_max);
  my_info.append('contact_style', user.contact_style);
  my_info.append('drinking_style', user.drinking_style);
  my_info.append('smoking_style', user.smoking_style);

  useEffect(() => {
    console.log(moreinfo);
  }, [moreinfo]);

  async function sendMyInfo() {
    await axios({
      method: 'post',
      url: '/api/member/info',
      data: my_info,
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
      data: my_fav,
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
  return (
    <div className="bg-white w-[22.5rem] h-[48.75rem]">
      <img
        src="/heart-step-5.svg"
        alt=""
        className="mx-auto w-48 pt-16 pb-10"
      />
      <h1 className="text-center text-2xl text-[#364C63] mb-3">더 많은 정보</h1>
      <p className="text-center text-xs text-gray-400 font-sans">
        좋은 사람을 찾기 위해 추가 정보를 넣어주세요
      </p>
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          반려 동물이 있나요?
        </h3>
        <div className="grid grid-rows-3 grid-flow-col">
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  pet: e.target.value,
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
              없음
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  pet: e.target.value,
                }));
              }}
              id="drink3"
              type="radio"
              name="drink"
              value="CAT"
              className="peer/drink3"
            />
            <label
              htmlFor="drink3"
              className="peer-checked/drink3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              고양이
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  pet: e.target.value,
                }));
              }}
              id="drink5"
              type="radio"
              name="drink"
              value="LIZARD"
              className="peer/drink5"
            />
            <label
              htmlFor="drink5"
              className="peer-checked/drink5:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              도마뱀
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  pet: e.target.value,
                }));
              }}
              id="drink2"
              type="radio"
              name="drink"
              value="DOG"
              className="peer/drink2"
            />
            <label
              htmlFor="drink2"
              className="peer-checked/drink2:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              강아지
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                 pet: e.target.value,
                }));
              }}
              id="drink4"
              type="radio"
              name="drink"
              value="HAMSTER"
              className="peer/drink4"
            />
            <label
              htmlFor="drink4"
              className="peer-checked/drink4:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              햄스터
            </label>
          </div>
          <div className="ml-1">
            <input
              onClick={(e) => {
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  pet: e.target.value,
                }));
              }}
              id="drink6"
              type="radio"
              name="drink"
              value="ETC"
              className="peer/drink6"
            />
            <label
              htmlFor="drink6"
              className="peer-checked/drink6:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              기타
            </label>
          </div>
        </div>
      </div>
      <div className="my-8 mx-8">
        <h3 className="text-[#364C63] block mb-5 text-base">
          MBTI가 어떻게 되시나요?
        </h3>
        <div className="grid grid-flow-col">
          <div className="mr-20">
            <input
              onClick={(e) => {
                setMBTI1(e.target.value)
              }}
              id="MBTI1"
              type="radio"
              name="MBTI1"
              value="E"
              className="peer/MBTI1"
            />
            <label
              htmlFor="MBTI1"
              className="peer-checked/MBTI1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              E
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMBTI1(e.target.value)
              }}
              id="smoke3"
              type="radio"
              name="MBTI1"
              value="I"
              className="peer/smoke3"
            />
            <label
              htmlFor="smoke3"
              className="peer-checked/smoke3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              I
            </label>
          </div>
        </div>
        <div className="grid grid-flow-col">
          <div className="mr-20">
            <input
              onClick={(e) => {
                setMBTI2(e.target.value)
              }}
              id="smoke1"
              type="radio"
              name="MBTI2"
              value="N"
              className="peer/smoke1"
            />
            <label
              htmlFor="smoke1"
              className="peer-checked/smoke1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              N
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMBTI2(e.target.value)
              }}
              id="smoke3"
              type="radio"
              name="MBTI2"
              value="S"
              className="peer/smoke3"
            />
            <label
              htmlFor="smoke3"
              className="peer-checked/smoke3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              S
            </label>
          </div>
        </div>
        <div className="grid grid-flow-col">
          <div className="mr-20">
            <input
              onClick={(e) => {
                setMBTI3(e.target.value)
              }}
              id="smoke1"
              type="radio"
              name="MBTI3"
              value="F"
              className="peer/smoke1"
            />
            <label
              htmlFor="smoke1"
              className="peer-checked/smoke1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              F
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMBTI3(e.target.value)
              }}
              id="smoke3"
              type="radio"
              name="MBTI3"
              value="T"
              className="peer/smoke3"
            />
            <label
              htmlFor="smoke3"
              className="peer-checked/smoke3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              T
            </label>
          </div>
        </div>
        <div className="grid grid-flow-col">
          <div className="mr-20">
            <input
              onClick={(e) => {
                setMBTI4(e.target.value)
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  MBTI: MBTI1 + MBTI2 + MBTI3 + MBTI4,
                }));
              }}
              id="smoke1"
              type="radio"
              name="MBTI4"
              value="J"
              className="peer/smoke1"
            />
            <label
              htmlFor="smoke1"
              className="peer-checked/smoke1:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              J
            </label>
          </div>
          <div>
            <input
              onClick={(e) => {
                setMBTI4(e.target.value)
                setMoreInfo((prevInfo) => ({
                  ...prevInfo,
                  MBTI: MBTI1 + MBTI2 + MBTI3 + MBTI4,
                }));
              }}
              id="smoke3"
              type="radio"
              name="MBTI4"
              value="P"
              className="peer/smoke3"
            />
            <label
              htmlFor="smoke3"
              className="peer-checked/smoke3:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1"
            >
              P
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
              next() 
              sendInfo()
              sendMyInfo()
              sendPreferInfo()
            }}
          >
            &gt;
        </button>
      </div>
    </div>
  );
}

export default MoreInfo5;
