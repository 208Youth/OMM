/* eslint-disable */
import React, { useState } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';;

function PasswordModal({ setPasswordModal, setPasswordComplete }) {
  const [pw, setPw] = useState('');
  const saveData = () => {
    const password = pw;
    window.localStorage.setItem('Password', password);
    setPasswordComplete(true);
    setPasswordModal(false);
  };

  const onChange = (e) => {
    setPw(e.target.value);
  };

  return (
    <div className="flex-col mx-auto ">
      <p className="flex justify-end">
        <img
          onClick={() => setPasswordModal(false)}
          src={CloseBtn}
          className="w-8 h-8"
          alt="닫기"
          aria-hidden="true"
        />
      </p>
      <p className="text-3xl text-left ml-2 mt-2 leading-relaxed">
        비밀번호
        <br />
        설정
      </p>
      <form className='flex flex-col justify-center'>
        <input type="password" value={pw} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 mx-auto my-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••"/>
        <button onClick={saveData} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-15 mx-auto my-2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          저장
        </button>
      </form>
    </div>
  );
}

export default PasswordModal;
