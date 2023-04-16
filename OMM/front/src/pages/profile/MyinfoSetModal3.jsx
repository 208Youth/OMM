import React, { useState, useEffect } from 'react';
import './Profile.css';
import CloseBtn from '../../assets/CloseBtn.svg';
import http from '../../api/http';

function MyinfoSetModal3({ setModal }) {
  const token = localStorage.getItem('accesstoken');
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');

  async function fetchInterests() {
    await http({
      method: 'GET',
      url: '/member/interest-list',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setInterests(res.data.interestList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const sendInterests = async () => {
    const interestList = interests.map((interest) => (typeof interest === 'object' ? interest.name : interest));
    await http({
      method: 'PUT',
      url: '/member/interest-list',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { interestList },
    })
      .then(() => {
        alert('관심사가 저장되었습니다.');
        setModal(true);
        location.reload();
      })
      .catch(() => {
        alert('모든 정보를 입력해 주세요.');
      });
  };

  async function handleAddInterest() {
    if (newInterest.trim() && (interests.length) < 6) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  }

  function handleRemoveInterest(index) {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  }

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

      <div className="text-center mt-4">
        관심사:
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
          <button
            className="bg-white border border-black rounded-xl m-1 px-1"
            key={index}
            onClick={() => handleRemoveInterest(index)}
          >
            {interest}
          </button>
        ))}
      </div>
      <div className="relative top-10 text-center ">
        <button className="text-white rounded-xl bg-slate-600 w-20 mt-3" onClick={sendInterests}>완료</button>
      </div>

    </div>
  );
}

export default MyinfoSetModal3;
