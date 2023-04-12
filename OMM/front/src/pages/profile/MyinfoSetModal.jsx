import React, { useState } from 'react';
import http from '../../api/http';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';

function MyinfoSetModal(props) {
  const { setModal, basicInformation } = props;
  const [myinfo, setMyInfo] = useState(basicInformation);
  const token = localStorage.getItem('accesstoken');

  const [MBTI1, setMBTI1] = useState('');
  const [MBTI2, setMBTI2] = useState('');
  const [MBTI3, setMBTI3] = useState('');
  const [MBTI4, setMBTI4] = useState('');

  const data = {
    nickname: myinfo.nickname,
    height: myinfo.height,
    contact_style: myinfo.contact_style,
    drinking_style: myinfo.drinking_style,
    smoking_style: myinfo.smoking_style,
    military: myinfo.military,
    pet: myinfo.pet,
    MBTI: myinfo.MBTI,
  };
  const Changeinfo = () => {
    http({
      method: 'PUT',
      url: '/member/info',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    })
      .then(() => {
        setModal(false);
        location.reload();
      })
      .catch(() => {
        alert('모든 정보를 설정해 주세요');
      });
  };

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
        <h1>내 정보</h1>
        <div className="">
          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              음주 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NOT', 'SOMETIMES', 'OFTEN', 'ONLY_FRIENDS', 'EVERYDAY', 'STOPPING'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
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
                    {style === 'NOT' ? '안함'
                      : style === 'SOMETIMES' ? '가끔'
                        : style === 'OFTEN' ? '자주'
                          : style === 'ONLY_FRIENDS' ? '친구들과'
                            : style === 'EVERYDAY' ? '매일'
                              : style === 'STOPPING' ? '금주 중' : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              연락 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['PREFER_MSG', 'PREFER_CALL', 'PREFER_FACECALL', 'NOT_MSG', 'PREFER_OFFLINE'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
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
                    {style === 'PREFER_MSG' ? '카톡 자주'
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
            <h3 className="text-[#364C63] block mb-5 text-base">
              흡연 스타일
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NOT', 'SOMETIMES', 'OFTEN', 'STOPPING'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
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
                    {style === 'NOT' ? '비흡연자'
                      : style === 'SOMETIMES' ? '진짜 가끔'
                        : style === 'OFTEN' ? '자주 핌'
                          : style === 'STOPPING' ? '금연중' : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              병무사항
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NONE', 'EXEMPT', 'COMPLETE', 'YET'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
                        ...prevInfo,
                        military: e.target.value,
                      }));
                    }}
                    id={`military${index + 1}`}
                    type="radio"
                    name="military"
                    value={style}
                    className={`peer/military${index + 1}`}
                  />
                  <label
                    htmlFor={`military${index + 1}`}
                    className={`peer-checked/military${index + 1}:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1`}
                  >
                    {style === 'NONE' ? '해당없음'
                      : style === 'EXEMPT' ? '면제'
                        : style === 'COMPLETE' ? '군필'
                          : style === 'YET' ? '미필'
                            : ''}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              MBTI
            </h3>
            <div className="grid grid-flow-col">
              <div className="mr-20">
                <input
                  onClick={(e) => {
                    setMBTI1(e.target.value);
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
                    setMBTI1(e.target.value);
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
                    setMBTI2(e.target.value);
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
                    setMBTI2(e.target.value);
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
                    setMBTI3(e.target.value);
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
              <div className="ml-1">
                <input
                  onClick={(e) => {
                    setMBTI3(e.target.value);
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
                    setMBTI4(e.target.value);
                    setMyInfo((prevInfo) => ({
                      ...prevInfo,
                      MBTI: MBTI1 + MBTI2 + MBTI3 + e.target.value,
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
              <div className="ml-1">
                <input
                  onClick={(e) => {
                    setMBTI4(e.target.value);
                    setMyInfo((prevInfo) => ({
                      ...prevInfo,
                      MBTI: MBTI1 + MBTI2 + MBTI3 + e.target.value,
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
          <div className="my-8 mx-8">
            <h3 className="text-[#364C63] block mb-5 text-base">
              반려동물
            </h3>
            <div className="grid grid-rows-3 grid-flow-col">
              {['NOT', 'DOG', 'CAT', 'HAMSTER', 'LIZARD', 'ETC'].map((style, index) => (
                <div key={index} className={index >= 0 ? 'ml-1' : ''}>
                  <input
                    onClick={(e) => {
                      setMyInfo((prevInfo) => ({
                        ...prevInfo,
                        pet: e.target.value,
                      }));
                    }}
                    id={`pet${index + 1}`}
                    type="radio"
                    name="pet"
                    value={style}
                    className={`peer/pet${index + 1}`}
                  />
                  <label
                    htmlFor={`pet${index + 1}`}
                    className={`peer-checked/pet${index + 1}:text-sky-500 font-sans text-[#364C63] font-semibold text-sm ml-1`}
                  >
                    {style === 'NOT' ? '없음'
                      : style === 'DOG' ? '강아지'
                        : style === 'CAT' ? '고양이'
                          : style === 'HAMSTER' ? '햄스터'
                            : style === 'LIZARD' ? '도마뱀'
                              : style === 'ETC' ? '기타' : ''}
                  </label>
                </div>
              ))}

            </div>
            <div className="text-center mt-3">
              <button onClick={Changeinfo} className="border border-black w-16 h-7 bg-white rounded-lg ">완료</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MyinfoSetModal;
