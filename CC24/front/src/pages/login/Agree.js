/* eslint-disable */
import React, { useCallback, useState } from 'react';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import { useSelector } from 'react-redux';
import { EthrDID } from 'ethr-did';
import ommapi from '../../api/ommapi';

function Agree() {
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    checkedItemHandler(e.target.checked);
    console.log(e.target.checked);
  };
  const toOMM = async () => {
    if (isChecked) {
      await ommapi.get()
    } else {
      alert('동의해 주세요.');
    }
  };
  return (
    <div className="wrap-box">
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed">
          정보
          <br />
          제공
          <br />
          동의
          {checkedList}
        </p>
        <p className="text-xl mt-10 mb-4 leading-relaxed text-center text-blue-800" >이름, 나이, 성별</p>
        <p className="text-lg mb-4 leading-relaxed px-10">개인정보 제공에 동의해야만 OMM 서비스를 이용할 수 있습니다.</p>
      </div>
      <div className="flex-col w-80 mx-auto text-center content-center">
        <p className="flex-col my-auto text-lg inline">동의하시겠습니까?</p>
        <input
          value="동의"
          type="checkbox"
          onChange={(e) => {
            checkHandler(e);
          }}
          className="w-4 h-4 inline ml-2 text-blue-800 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
      </div>
        <div className="mx-auto mt-10 text-center">
          {!isChecked && (
            <button disabled type="button" className="btn">
              OMM 회원 가입
            </button>
          )}
          {isChecked && (
            <button onClick={toOMM} type="button" className="btn">
              OMM 회원 가입
            </button>
          )}
        </div>
    </div>
  );
}

export default Agree;
