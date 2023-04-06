import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import '../../index.css';
// import CloseBtn from '../../assets/CloseBtn.svg';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';
import http from '../../api/http';

function MyinfoSetModal3({ setModal }) {
  // const [interests, setInterests] = useState([]);
  const [interests, setInterests] = useState(['잠자기', '밥먹기', '술마시기', '눕기', '유투브보기', '간식먹기']);
  const [newInterest, setNewInterest] = useState('');
  const memberId = 1;

  // API에서 관심사 리스트를 가져오는 함수
  async function fetchInterests() {
    await http({
      method: 'get',
      url: `/member/${memberId}/interest-list`,
      // headers: {
      //   Authorization: import.meta.env.VITE_TOKEN,
      // },
    })
      .then((res) => {
        console.log(res);
        setInterests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 관심사 리스트를 API로 보내는 함수
  async function sendInterests() {
    const interestList = interests.map((interest, index) => ({
      interest_list_id: index + 1,
      name: interest,
    }));
    console.log(interestList);
    await http.put(`/member/${memberId}}/interest-list`, interests);
    alert('관심사가 저장되었습니다.');
    setModal(true);
  }

  // 추가 버튼 클릭 시, 관심사를 추가하는 함수
  function handleAddInterest() {
    if (newInterest.trim() && (interests.length) < 6) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  }

  // 삭제 버튼 클릭 시, 관심사를 삭제하는 함수
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
