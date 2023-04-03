/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './Signup.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { EthrDID } from 'ethr-did';
// import EthrDidResolver from 'ethr-did-resolver';
// import { getResolver } from 'ethr-did-resolver';
import FaceRecogModal from './FaceRecogModal';
import IdenModal from './IdenModal';
import PasswordModal from './PasswordModal';
import { userInfo, idenVC, certInfo } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [faceModal, setFaceModal] = useState(false);
  const [faceComplete, setFaceComplete] = useState(false);
  const [idenModal, setIdenModal] = useState(false);
  const [idenComplete, setIdenComplete] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordComplete, setPasswordComplete] = useState(false);
  const [name, setName] = useState(null);
  const [year, setYear] = useState('1980');
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  const [gender, setGender] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);

  const sendInfo = () => {
    const info = {
      name,
      year,
      month,
      day,
      gender,
    };
    console.log(info);
    dispatch(userInfo(info));
  };
  const signup = async function () {
    const Info = {
      name,
      year,
      gender,
    };
    window.localStorage.setItem('Info', JSON.stringify(Info));
    const keypair = EthrDID.createKeyPair();
    const chainNameOrId = 'goerli'; // you can use the network name for the most popular [test] networks.
    const ethrDidOnGoerliNamed = new EthrDID({ ...keypair, chainNameOrId });
    window.localStorage.setItem('keypair', JSON.stringify(keypair));
    window.localStorage.setItem('DID', JSON.stringify(ethrDidOnGoerliNamed));
    const localData = JSON.parse(localStorage.getItem('DID'));
    console.log(localData.did);
    const data = new FormData();
    console.log(id.personalId);
    data.append('holderDid', localData.did);
    data.append('personalId', JSON.stringify(id.personalId));
    data.append('signature', id.signature);
    data.append('image', img);
    for (let key of data.keys()) {
      console.log(key, ":", data.get(key));
    }

    await axios({
      method: 'post',
      url: 'http://localhost:4424/api/node/credential/personal-id',
      data: data,

    })
      .then((res) => {
        console.log('성공!!!!!!!!', res);
        dispatch(idenVC(res.data.vcJwt));
        window.localStorage.setItem('IdenVC', JSON.stringify(res.data.vcJwt));
        dispatch(certInfo('신분증'))
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate('/main');
    console.log(img);
  };

  useEffect(() => {
    if (faceModal) {
      console.log('모달 열림');
    } else {
      console.log('모달 닫힘');
    }
  }, [faceModal]);
  useEffect(() => {
    if (idenModal) {
      console.log('모달 열림');
    } else {
      console.log('모달 닫힘');
    }
  }, [idenModal]);

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
        <FaceRecogModal
          setFaceModal={setFaceModal}
          img={(res) => {setImg(res)}}
          setFaceComplete={(res) => {
            if (res) {
              setFaceComplete(true);
            }
          }}
          name={name}
        />
      </Modal>
      <Modal
        isOpen={idenModal}
        onRequestClose={() => setIdenModal(false)}
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        <IdenModal 
          setIdenModal={setIdenModal}
          setIdenComplete={(res) => {
            if (res) {
              setIdenComplete(true);
            }
          }}
          inputday={day}
          inputname={name}
          inputyear={year}
          inputmonth={month}
          inputgender={gender}
        />
      </Modal>
      <Modal
        isOpen={passwordModal}
        onRequestClose={() => setPasswordModal(false)}
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        <PasswordModal
          setPasswordModal={setPasswordModal}
          setPasswordComplete={(res) => {
            if (res) {
              setPasswordComplete(true);
            }
          }}
        />
      </Modal>
      <div className="flex-col w-80 mx-auto">
        <p className="text-3xl text-left mb-4 leading-relaxed" onClick={signup}>
          회원
          <br />
          인증
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
                className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  onClick={() => setGender('남')}
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
                  onClick={() => setGender('여')}
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
                얼굴 인증
              </div>
              <div className="col-end-7 col-span-2">
                <div
                  onClick={() => {
                    setFaceModal(true);
                  }}
                  className=" inline text-white bg-[#4654a3] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-1 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  첨부
                </div>
                <svg
                  className={faceComplete ? 'hidden' : 'checkmark'}
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
                <svg
                  className={faceComplete ? 'checkmark' : 'hidden'}
                  fill="#4654a3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 my-6">
              <div htmlFor="face" className="col-start-1 col-end-3 inline">
                본인 확인
              </div>
              <div className="col-end-7 col-span-2">
                <div
                  onClick={() => {
                    sendInfo();
                    setIdenModal(true);
                  }}
                  className="inline text-white bg-[#4654a3] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  첨부
                </div>
                <svg
                  className={idenComplete ? 'hidden' : 'checkmark'}
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
                <svg
                  className={idenComplete ? 'checkmark' : 'hidden'}
                  fill="#4654a3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4 my-6">
              <div htmlFor="face" className="col-start-1 col-end-3 inline">
                비밀번호
              </div>
              <div className="col-end-7 col-span-2">
                <div
                  onClick={() => {
                    setPasswordModal(true);
                  }}
                  className="inline text-white bg-[#4654a3] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  설정
                </div>
                <svg
                  className={passwordComplete ? 'hidden' : 'checkmark'}
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
                <svg
                  className={passwordComplete ? 'checkmark' : 'hidden'}
                  fill="#4654a3"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  />
                </svg>
              </div>
            </div>
            <div className="mx-auto text-center">
              {!(faceComplete && idenComplete && passwordComplete) && (
                <button disabled type="button" className="btn">
                  회원 가입
                </button>
              )}
              {faceComplete && idenComplete && passwordComplete && (
                <button onClick={signup} type="button" className="btn">
                  회원 가입
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
