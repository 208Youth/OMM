/* eslint-disable */
import React, { useCallback, useState } from 'react';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import { useSelector } from 'react-redux';
import { EthrDID } from 'ethr-did';
import ommapi from '../../api/ommapi';

function Agree() {
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const did = JSON.parse(localStorage.getItem('DID')).did;

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
  const data = {
    type: 'SIGNUP',
    holderDid: did,
    vpJwt:
      'eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGVXpJMU5rc3RVaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsZUhBaU9qRTJPREkzTlRjMU9USXNJblpqSWpwN0lrQmpiMjUwWlhoMElqcGJJbWgwZEhCek9pOHZkM2QzTG5jekxtOXlaeTh5TURFNEwyTnlaV1JsYm5ScFlXeHpMM1l4SWwwc0luUjVjR1VpT2xzaVZtVnlhV1pwWVdKc1pVTnlaV1JsYm5ScFlXd2lMQ0pRWlhKemIyNWhiRWxrUTNKbFpHVnVkR2xoYkNKZExDSmpjbVZrWlc1MGFXRnNVM1ZpYW1WamRDSTZleUp3WlhKemIyNWhiRWx1Wm04aU9uc2libUZ0WlNJNkl1cTVnT3ljcE91dnVDSXNJbUpwY25Sb1pHRjBaU0k2SWpFNU9Ua3RNVEV0TVRZaUxDSm5aVzVrWlhJaU9pSkdSVTFCVEVVaWZYMTlMQ0p6ZFdJaU9pSmthV1E2WlhSb2NqcG5iMlZ5YkdrNk1IZ3dNMlJtT0dVMU5HRXpNR1V6T1RBMlpESTBNMlEzTkRBeVl6VTVZamd5WWpWa09EVTBNakl6WW1FellXVTVOamxsWVRJelpESmpNVEppT0dSaE5EbGpOV1VpTENKcGMzTWlPaUprYVdRNlpYUm9janBuYjJWeWJHazZNSGd3TXpBM1pqUmtPRFUzTVdSa056WmpOakZqTUdJMVl6aGxaV1ppT0RBMU4yVTRORGxqWWpjd1pUSXdNV014WWpCa016TXhaV1U1Tnpaa09UVXpOMkkzTTJJaWZRLng5Qnd6bFpjSDhTd21NeXJDbzdVZFdpNUIzZW1WSldaZWJ0RHd6ZGlJNldsd1drSW9BVW56dC12SmxxVnZnOFo0amZNYTRnR3BZM3JWUnhiNlFCQjJBQSJdfSwiaXNzIjoiZGlkOmV0aHI6Z29lcmxpOjB4MDNkZjhlNTRhMzBlMzkwNmQyNDNkNzQwMmM1OWI4MmI1ZDg1NDIyM2JhM2FlOTY5ZWEyM2QyYzEyYjhkYTQ5YzVlIn0.aaQ-BH_yEonZanA95Afb2yRGHbNMLfpXwymvPYywWRr3Iq8fl8qmAWdT-97btV21jNNDgA1XBTccqZM5_rIa5wA',
  };
  const toOMM = async () => {
    if (isChecked) {
      await ommapi
        .post(`${type}`, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
        <p className="text-xl mt-10 mb-4 leading-relaxed text-center text-blue-800">
          이름, 나이, 성별
        </p>
        <p className="text-lg mb-4 leading-relaxed px-10">
          개인정보 제공에 동의해야만 OMM 서비스를 이용할 수 있습니다.
        </p>
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
