/* eslint-disable */

import React, { useState, useEffect } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';
import './IdenModal.css';
// import fastapi from '../../api/fastapi.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

function IdenModal({ setIdenModal, setIdenComplete }) {
  const [imageSrc, setImageSrc] = useState('');
  const [imgfile, setFile] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');

  // fastapi의 idening를 실행시키기 위한 코드
  async function sendImg() {
    console.log(imgfile);
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/idenimg',
      data: {
        // 데이터의 파일부분에 문제가 있는 것 같다.
        file: imgfile,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setBirthday(res.data.birthday);
        setGender(res.data.gender);
        console.log('fastapi로 이미지를 보냈습니다.');
      })
      .catch((err) => {
        console.log(err);
        console.log('fastapi로 이미지를 보내는데 실패했습니다.');
      });
  }
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);
    setFile(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };
  // 데이터가 변경되면 재렌더링 되게 하는 코드
  useEffect(() => {
    if (imgfile) {
      sendImg();
    }
  }, [imgfile]);
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    await encodeFileToBase64(file);

    // fastapi/iden_img에 이미지를 저장하는 코드를 써야한다.
    const formData = new FormData();
    formData.append('file', file);
    // const { data } = await fastapi.get('/');

    // fastapi.post('/idenimg', { file: imgfile });
    // const { data } = await fastapi.post('/ocr');

    // console.log(data); // 처리 결과 출력
    // const { data } = await fastapi.post('/ocr', { path });
  };

  return (
    <div className="flex-col w-80 mx-auto">
      <p className="flex">
        <img
          onClick={() => setIdenModal(false)}
          src={CloseBtn}
          className="w-8 h-8 ml-auto mt-2"
          alt="닫기"
        />
      </p>
      <br />
      <br />
      <div>
        <p className="text-3xl text-left ml-9 leading-relaxed" style={{ marginLeft: '1rem' }}>
          본인
        </p>
      </div>
      <div>
        <p className="text-3xl text-left ml-9 leading-relaxed" style={{ marginLeft: '1rem' }}>
          확인
        </p>
        <br />
      </div>
      <div className="mx-auto text-center flex">
        <div className="mx-auto">
          {!imageSrc && (
            <label htmlFor="imginput">
              <div className="fileinput" />
            </label>
          )}
          <input
            id="imginput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
          />
        </div>
      </div>
      <div className="preview" style={{ marginLeft: '2rem' }}>
        {imageSrc && <img src={imageSrc} alt="preview-img" className="idenimage" />}
      </div>
      <br />
      <div>
        {imageSrc && (
          <Result
            data={{
              name,
              gender,
              birthday,
            }}
            setIdenModal={setIdenModal}
            setIdenComplete={setIdenComplete}
          />
        )}
      </div>
    </div>
  );
}

function Result({ data, setIdenModal, setIdenComplete }) {
  let { name, gender, birthday } = data;
  const strbirth = String(birthday);
  let year = strbirth.slice(0, 2);
  if (year >= 20) {
    year = `19${year}`;
  } else {
    year = `20${year}`;
  }
  let month = strbirth.slice(2, 4);
  if (month.slice(0, 1) == '0') {
    month = month.slice(1, 2);
  }
  let day = strbirth.slice(4, 6);
  if (day.slice(0, 1) == '0') {
    day = day.slice(1, 2);
  }
  if (gender == '1' || gender == '3') {
    gender = '남';
  } else {
    gender = '여';
  }
  const storeName = useSelector(state => state.user.name);
  const storeYear = useSelector(state => state.user.year);
  const storeMonth = useSelector(state => state.user.month);
  const storeDay = useSelector(state => state.user.day);
  const storeGender = useSelector(state => state.user.gender);
  // 일치 여부 확인
  let nameCheck = false;
  let birthdayCheck = false;
  let genderCheck = false;
  if (name == storeName) {
    nameCheck = true;
  }
  if (gender == storeGender) {
    genderCheck = true;
  }
  if (storeYear == year && storeMonth == month && storeDay == day) {
    birthdayCheck = true;
  }
  // 모두 일치하면 확인 완료 버튼 활성화
  let complete = false;
  if (nameCheck && genderCheck && birthdayCheck) {
    complete = true;
  }

  return (
    <div>
      <div className="flex mx-5 justify-between">
        <div>
          <span className="keys">이름</span>
          <img src="/public/Vector76.png" alt="#" className="inline ml-2" />
        </div>
        <div>
          <span>{name}</span>
          {nameCheck && <img src="/public/check.png" alt="#" className="ml-3 inline" />}
        </div>
      </div>

      <div className="flex mx-5 justify-between">
        <div>
          <span className="keys">성별</span>
          <img src="/public/Vector76.png" alt="#" className="inline ml-2" />
        </div>
        <div>
          <span>{gender}</span>
          {genderCheck && <img src="/public/check.png" alt="#" className="ml-3 inline" />}
        </div>
      </div>
      <div className="flex mx-5 justify-between">
        <div>
          <span className="keys">생년월일</span>
          <img src="/public/Vector76.png" alt="#" className="inline ml-2" />
        </div>
        <div>
          <span>
            {year}년 {month}월 {day}일
          </span>
          {birthdayCheck && <img src="/public/check.png" alt="#" className="ml-3 inline" />}
        </div>
      </div>
      <div className="mx-auto text-center">
        <div>
          {complete && (
            <button
              className="btn-active"
              onClick={() => {
                setIdenComplete(true);
                setIdenModal(false);
              }}
            >
              확인 완료
            </button>
          )}
        </div>
        <div>{!complete && <button className="btn-inactive">확인 완료</button>}</div>
      </div>
    </div>
  );
}

export default IdenModal;
