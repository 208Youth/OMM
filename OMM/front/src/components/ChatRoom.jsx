import React, { useState, useEffect } from 'react';
import Img from '../assets/testprofile.png';

function ChatRoom({ chat, moveTo }) {
  const [lasttime, setLasttime] = useState(null);
  const [notread, setNotRead] = useState('');

  useEffect(() => {
    const now = new Date();
    const compareTime = new Date(chat.lastMsgTime);
    let timeDiff = now.getTime() - compareTime.getTime(); // 밀리초 단위의 차이
    let minutesDiff = Math.floor(timeDiff / 1000 / 60); // 분 단위의 차이
    if (minutesDiff >= 60) {
      const hourDiff = Math.floor(minutesDiff / 60);
      if (hourDiff >= 24 && hourDiff <= 72) {
        const dayDiff = Math.floor(hourDiff / 24);
        setLasttime(`${dayDiff}일 전`);
      } else if (hourDiff > 73) {
        const year = compareTime.getFullYear();
        const month = compareTime.getMonth();
        const day = compareTime.getDay();
        setLasttime(`${year}.${month}.${day}`);
      }
      setLasttime(`${hourDiff}시간 전`);
    } else if (minutesDiff) {
      setLasttime(`${minutesDiff}분 전`);
    } else {
      setLasttime('방금 전');
    }
    // console.log(now); // Thu Mar 30 2023 01:19:35 GMT+0900
    // 날짜비교 후 setLasttime 변경
    // 오늘 -> 몇 초(1분 이내), 몇 분(1시간 이내), 몇 시간(24시간 이내)
    // 어제
    // 3일 전이상 -> 날짜로 표시 (올해 이면 월, 일 / 올해가 아니면 년, 월, 일)
    const read = chat.msgs - chat.myNotReadIndex;
    if (read === 0) {
      setNotRead('0');
    } else if (read >= 99) {
      setNotRead('99+');
    } else {
      setNotRead(`${read}`);
    }
  }, [chat]);

  return (
    <div
      onClick={() => {
        moveTo(true);
      }}
      aria-hidden
      className="w-[312px] h-[4.7rem] flex p-3 bg-white bg-opacity-60 text-xs rounded-lg mb-1"
    >
      <div className="w-10 h-10 self-center rounded-full">
        <img src={chat.other.image} alt="사진" />
        {/* <img src={Img} alt="사진" /> */}
      </div>
      <div className="self-center w-40 ml-3">
        <div className="text-xs mb-1">{chat.other.nickname}</div>
        <div className="font-sans font-semibold text-[0.7rem] text-gray-500 overflow-x-hidden text-ellipsis whitespace-nowrap">
          {chat.content}
        </div>
      </div>
      <div
        className={
          lasttime?.length > 8 ? 'self-center ml-1' : 'self-center ml-6'
        }
      >
        <div className="text-[0.3rem] font-sans font-semibold mb-1 text-gray-500 mx-auto">
          {lasttime}
        </div>
        <div
          className={
            notread === '0'
              ? 'rounded-xl w-7 h-fit bg-white text-center text-[0.5rem] mx-auto invisible'
              : 'rounded-xl w-7 h-fit bg-white text-center text-[0.5rem] mx-auto'
          }
        >
          {notread}
        </div>
        {!notread && (
          <div className="rounded-xl w-7 h-fit bg-white text-center text-[0.5rem] mx-auto">
            {notread}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatRoom;
