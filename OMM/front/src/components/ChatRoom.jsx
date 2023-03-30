import React, { useState, useEffect } from 'react';
import Img from '../assets/testprofile.png';

function ChatRoom() {
  const [lastmessage, setLastmessage] = useState(
    '내가 그대를 사랑해도 될까요..제발',
  );
  const [lasttime, setLasttime] = useState('3일');
  const [count, setCount] = useState(111);

  useEffect(() => {
    const now = new Date();
    // console.log(now); // Thu Mar 30 2023 01:19:35 GMT+0900
    // 날짜비교 후 setLasttime 변경
    // 오늘 -> 몇 초(1분 이내), 몇 분(1시간 이내), 몇 시간(24시간 이내)
    // 어제
    // 3일 전이상 -> 날짜로 표시 (올해 이면 월, 일 / 올해가 아니면 년, 월, 일)
  });

  return (
    <div className="w-[312px] h-[4.7rem] flex p-3 bg-white bg-opacity-60 text-xs rounded-lg mb-1">
      <div className="w-10 h-10 self-center rounded-full">
        <img src={Img} alt="사진" />
      </div>
      <div className="self-center w-40 ml-3">
        <div className="text-xs mb-1">보영</div>
        <div className="font-sans font-semibold text-[0.7rem] text-gray-500 overflow-x-hidden text-ellipsis whitespace-nowrap">
          {lastmessage}
        </div>
      </div>
      <div
        className={
          lasttime.length > 8 ? 'self-center ml-1' : 'self-center ml-6'
        }
      >
        <div className="text-[0.3rem] font-sans font-semibold mb-1 text-gray-500 mx-auto">
          {lasttime}
          {lasttime.length > 3 ? '' : ' 전'}
        </div>
        <div className="rounded-xl w-7 h-fit bg-white text-center text-[0.5rem] mx-auto">
          {count > 99 ? '99+' : count}
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
