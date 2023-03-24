import React, { useState, useEffect } from 'react';
import CloseBtn from '../../assets/CloseBtn.svg';
import './IdenModal.css';
import Idenconfirm1 from '../../assets/Idenconfirm1.svg';
import Idenconfirm2 from '../../assets/Idenconfirm2.svg';
// import fastapi from '../../api/fastapi.js';
import axios from 'axios';

function IdenModal({
  setIdenModal,
  setIdenComplete,
  formName,
  formYear,
  formMonth,
  formDay,
  formGender,
}) {
  const [imageSrc, setImageSrc] = useState('');
  const [imgfile, setFile] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [completed, setBtn] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [genderCheck, setGenderCheck] = useState(false);
  const [birthdayCheck, setBirthdayCheck] = useState(false);

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
        if (name === formName) {
          setNameCheck(true);
        }
        if (gender === (1 || 3) && formGender === 'male') {
          setGenderCheck(true);
        } else if (gender === (2 || 4) && formGender === 'female') {
          setGenderCheck(true);
        } else {
          setGenderCheck(false);
        }
        // if (formMonth < 10) {
        //   formMonth = '0' + formMonth
        // }
        // if (formDay < 10) {
        //   formDay = '0' + formDay
        // }
        if (formYear + formMonth + formDay === birthday) {
          setBirthdayCheck(true);
        }
        console.log('fastapi로이미지를 보냈습니다.');
      })
      .catch((err) => {
        if (formMonth < 10) {
          formMonth = `0${formMonth}`;
        }
        if (formDay < 10) {
          formDay = `0${formDay}`;
        }
        console.log(formYear + formMonth + formDay);
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
        setBtn(true);
        setIdenComplete(true);
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
        {formYear}
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
      <div>{imageSrc && <Result data={{ name, gender, birthday }} />}</div>
      <div className="mx-auto text-center">
        <div>{imageSrc && <button className="btn-active">확인 완료</button>}</div>
        <div>{!imageSrc && <button className="btn-inactive">확인 완료</button>}</div>
      </div>
      <div />
    </div>
  );
}

function Result(props) {
  const { name, gender, birthday } = props.data;
  const strbirth = String(birthday);
  const year = strbirth.slice(0, 2);
  const month = strbirth.slice(2, 4);
  const day = strbirth.slice(4, 6);
  return (
    <div style={{ marginLeft: '3rem' }}>
      <div className="parent">
        <span className="keys">이름</span>
        <img src="/public/Vector76.png" alt="#" className="vector76" />
        <span>{name}</span>
        {/* 회원가입창에서 가져온 값과 일치할때만 체크 표시 보여주기? */}
        <img src="/public/check.png" alt="#" className="check" />
      </div>

      <div className="parent">
        <span className="keys">성별</span>
        <img src="/public/Vector76.png" alt="#" className="vector76" />
        <span>{gender === (1 || 3) ? '남' : '여'}</span>
        <img src="/public/check.png" alt="#" className="check" />
      </div>
      <div className="parent">
        <span className="keys">생년월일</span>
        <img src="/public/Vector76.png" alt="#" className="vector76" />
        {/* <span>{birthday}</span> */}
        <span>
          {year}년 {month}월 {day}일
        </span>
      </div>

      <img src="/public/check.png" alt="#" className="check" />
    </div>
  );
}

export default IdenModal;
