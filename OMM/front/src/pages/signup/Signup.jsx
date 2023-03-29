import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [gender, setGender] = useState(null);

  const navigate = useNavigate();

  const goFaceRecog = () => {
    navigate('/faceRecog/signup', {
      state: { page: 'signup' },
    });
  };

  const signup = () => {
    console.log(name);
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(gender);
  };

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
    <div className="wrap-page">
      <div className="mx-auto text-center">
        <img src="../../../public/heart-step-0.svg" alt="" />
      </div>
      <div className="flex-col w-80 mx-auto">
        <p
          className="text-3xl my-4 text-center leading-relaxed mx-auto"
          onClick={signup}
          aria-hidden="true"
        >
          회원가입
        </p>
        <p
          className="text-md my-4 text-center leading-relaxed mx-auto"
          onClick={signup}
          aria-hidden="true"
        >
          신분증과 비교할 정보를 입력해 주세요.
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
                onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setYear(e.target.value)}
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
                  onChange={(e) => setMonth(e.target.value)}
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
                  onChange={(e) => setDay(e.target.value)}
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
              htmlFor="gender"
              className="block mb-6 text-sm font-medium text-gray-900 dark:text-white"
            >
              성별
            </label>
            <div className="flex mb-6">
              <div className="flex items-center mr-4">
                <input
                  onChange={(e) => setGender(e.target.value)}
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
                  onChange={(e) => setGender(e.target.value)}
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
            <div className="flex justify-between mx-8 text-[#364C63] text-lg">
              <div>&lt; </div>
              <div
                aria-hidden
                onClick={() => {
                  goFaceRecog();
                }}
              >
                &gt;
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
