import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import '../../index.css';
// import CloseBtn from '../../assets/CloseBtn.svg';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';
import http from '../../api/http';

function MyinfoSetModal3({ setModal }) {
  const token = localStorage.getItem('accesstoken');
  // const [interests, setInterests] = useState([]);
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const memberId = 1;
  // 아래는 초기 데이터 형식을 마추기 위해 interest_list_id라는 값과 name이 담긴객채로 만들어 주는 코드였으나 지금은 단순한 배열로 건내주면 된다.
  // const interestList = interests.map((interest, index) => ({
  //   interest_list_id: index + 1,
  //   name: interest,
  // }));
  const interestList = interests;

  // API에서 관심사 리스트를 가져오는 함수
  async function fetchInterests() {
    await http({
      method: 'get',
      url: `/member/${memberId}/interest-list`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('바뀐자료한번보자', res);
        console.log(res);
        console.log(res.data.interestList);
        setInterests(res.data.interestList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 관심사 리스트를 API로 보내는 함수
  // async function sendInterests() {
  //   const interestList = interests.map((interest, index) => ({
  //     interest_list_id: index + 1,
  //     name: interest,
  //   }));
  //   console.log(interestList);
  //   // await http.put(`/member/${memberId}/interest-list`, interests, `Bearer ${token}`);
  //   alert('관심사가 저장되었습니다.');
  //   setModal(true);
  // }

  const sendInterests = async () => {
    await http({
      method: 'PUT',
      url: '/member/interest-list',
      headers: {
        Authorization: `Bearer ${token}`,
      },

      // data: interestList,
      data: { interestList },
      // data: {
      //   interestList,
      // },
    })
      .then((res) => {
        console.log(res);
        alert('관심사가 저장되었습니다.');
        setModal(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(interestList);
      });
  };

  // 추가 버튼 클릭 시, 관심사를 추가하는 함수
  async function handleAddInterest() {
    if (newInterest.trim() && (interests.length) < 6) {
      await setInterests([...interests, newInterest.trim()]);
      console.log(interests);
      setNewInterest('');
    }
  }

  // 해당 버튼 클릭 시, 관심사를 삭제하는 함수
  function handleRemoveInterest(index) {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  }

  // 초기 실행 시, 관심사 리스트를 가져옴
  useEffect(() => {
    fetchInterests();
  }, []);

  return (
    <div className="absolute">
      <div>
        <img
          className="relative w-8 right-3 bottom-2"
          src={CloseBtn}
          alt="닫기"
          onClick={() => setModal(true)}
        />
      </div>

      <div className="text-center">
        <input
          className="rounded-lg"
          size={10}
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
        />
        <button className="m-2 w-10 text-white rounded-xl bg-slate-600" onClick={handleAddInterest}>추가</button>

      </div>
      <div className="relative w-30 top-4">
        {interests.map((interest, index) => (
          <button className="bg-white border border-black rounded-xl m-1 px-1" key={index} onClick={() => handleRemoveInterest(index)}>
            {interest}
          </button>
        ))}
      </div>
      <div className="relative top-10 text-center ">
        <button className="text-white rounded-xl bg-slate-600 w-20" onClick={sendInterests}>완료</button>
      </div>

    </div>
  );
}

export default MyinfoSetModal3;
