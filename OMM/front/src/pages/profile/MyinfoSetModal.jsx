// import { def } from '@vue/shared';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import '../../index.css';
// import CloseBtn from '../../assets/CloseBtn.svg';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';

function MyinfoSetModal(props) {
  const { setModal, basicInformation } = props;
  const [myinfo, setMyInfo] = useState(basicInformation);
  //   height: '',
  //   contact_stlye: '',
  //   drinking_stlye: '',
  //   smoking_stlye: '',
  //   military: '',
  //   pet: '',
  //  mbti: ''

  // });
  const [mbti, setMbti] = useState(['', '', '', '']);
  const handleMbtiChange = (index, value) => {
    const newMbti = [...mbti];
    newMbti[index] = value;
    setMbti(newMbti);
  };

  const data = {
    height: basicInformation.height,
    contact_stlye: basicInformation.contact_stlye,
    drinking_stlye: basicInformation.drinking_stlye,
    smoking_stlye: basicInformation.smoking_stlye,
    military: basicInformation.military,
    pet: basicInformation.pet,
    MBTI: mbti,
  };
  const Changeinfo = () => {
    axios.put('/api/member/info', data).then((response) => {
      console.log('Success:', response);
    }).catch((error) => {
      console.log('Error:', error);
    });
  };
  useEffect(() => {
    console.log(myinfo);
    console.log(mbti);
  }, [myinfo]);

  return (
    <div className="overflow-y-auto">
      <div>
        <img
          onClick={() => setModal(true)}
          src={CloseBtn}
          alt="닫기"
          className="w-8 h-8"
          aria-hidden="true"
        />
      </div>
      <div className="">
        <h1>내 정보</h1>
        <div className="">
          <div className="flex justify-between m-3">
            <span>키</span>
            <span>키값</span>

          </div>
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
                        contact_stlye: e.target.value,
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
                    {style === 'PREFER_MSG' ? '카톡러'
                      : style === 'PREFER_CALL' ? '전화'
                        : style === 'PREFER_FACECALL' ? '영상통화'
                          : style === 'NOT_MSG' ? '카톡 별로'
                            : style === 'PREFER_OFFLINE' ? '당장 만나'
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
                    {style === 'NOT' ? '비흡연러'
                      : style === 'SOMETIMES' ? '가끔'
                        : style === 'OFTEN' ? '구름과자 예술가'
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
            <div className="grid grid-rows-2 grid-flow-col">
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(0, 'I')}>I</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(0, 'E')}>E</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(1, 'N')}>N</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(1, 'S')}>S</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(2, 'T')}>T</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(2, 'F')}>F</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(3, 'J')}>J</button>
              <button className="border border-black m-1 rounded" onClick={() => handleMbtiChange(3, 'P')}>P</button>
              <div>
                MBTI:
                {' '}
                {mbti.join('')}
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
              <button className="border border-black w-16 h-7 bg-white rounded-lg ">완료</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MyinfoSetModal;
