import React, { useState } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';
import './PasswordModal.css';

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
      <form>
        <input type="text" value={pw} onChange={onChange} />
        <button onClick={saveData} type="button" className="border border-indigo-900">
          저장
        </button>
        <p>{window.localStorage.getItem('Password')}</p>
      </form>
    </div>
  );
}

export default PasswordModal;
