import React, { useEffect, useState } from 'react';
import './Signup.css';
import Modal from 'react-modal';
import FaceRecogModal from './FaceRecogModal';

function Signup() {
  const [faceModal, setFaceModal] = useState(false);
  useEffect(() => {
    if (faceModal) {
      console.log('모달 열림');
    } else {
      console.log('모달 닫힘');
    }
  }, [faceModal]);
  const years = [];
  for (let i = 1980; i < 2004; i++) {
    years.push(i);
  }
  const months = [];
  for (let i = 1; i < 13; i++) {
    months.push(i);
  }
  const days = [];
  for (let i = 1; i < 32; i++) {
    days.push(i);
  }
  return (
    <div className="wrap-box">
      <Modal
        isOpen={faceModal}
        onRequestClose={() => setFaceModal(false)}
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        <FaceRecogModal setFaceModal={setFaceModal} />
      </Modal>
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed">
          회원
          <br />
          가입
        </p>
        <form>
          <div className="mb-6">
            <div>
              <label
                htmlFor="name"
                className="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="김미미"
              />
            </div>
            <label
              htmlFor="age"
              className="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              생년월일
            </label>
            <div className="flex mt-6">
              <div>
                <select
                  id="years"
                  className="block w-30 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {years.map((year) => (
                    <option>{year}</option>
                  ))}
                </select>
              </div>
              <span className="p-2 mb-6 mr-3">년</span>
              <div>
                <select
                  id="months"
                  className="block w-30 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {months.map((month) => (
                    <option>{month}</option>
                  ))}
                </select>
              </div>
              <span className="p-2 mb-6 mr-3">월</span>
              <div>
                <select
                  id="days"
                  className="block w-30 p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {days.map((day) => (
                    <option>{day}</option>
                  ))}
                </select>
              </div>
              <span className="p-2 mb-6 mr-3">일</span>
            </div>
            <label
              htmlFor="sex"
              className="block mb-6 text-sm font-medium text-gray-900 dark:text-white"
            >
              성별
            </label>
            <div className="flex mb-6">
              <div className="flex items-center mr-4">
                <input
                  id="inline-radio"
                  type="radio"
                  value=""
                  name="inline-radio-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  남
                </label>
              </div>
              <div className="flex items-center mr-4">
                <input
                  id="inline-2-radio"
                  type="radio"
                  value=""
                  name="inline-radio-group"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="inline-2-radio"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  여
                </label>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 my-6">
              <div htmlFor="face" className="col-start-1 col-end-3 inline">
                얼굴 인식
              </div>
              <div className="col-end-7 col-span-2">
                <div
                  onClick={() => {
                    setFaceModal(true);
                  }}
                  className=" inline text-white bg-[#4654a3] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  촬영
                </div>
                <svg
                  className="w-6 ml-1 inline text-[#4654a3]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 my-6">
              <div htmlFor="face" className="col-start-1 col-end-3 inline">
                본인 확인
              </div>
              <div className="col-end-7 col-span-2">
                <div className="inline text-white bg-[#4654a3] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  촬영
                </div>
                <svg
                  className="w-6 ml-1 inline text-[#4654a3]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mx-auto text-center">
              <button type="submit" className="btn">
                회원 가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
