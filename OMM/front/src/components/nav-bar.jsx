import React, { useRef } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
import './nav-bar.scss';
import { Link } from 'react-router-dom';

function Navbar({ profileNav, mainNav, notiNav }) {
  // const ws = new SockJS('http://localhost:5173/notification');
  // const stompClient = Stomp.over(ws);

  // const sendMatch = () => {
  //   // redux 에서 첫번째사람 지우는 함수 작성
  //   // match 알림 보내기
  //   stompClient.connect({}, (frame) => {
  //     stompClient.send(
  //       '/api/pub/matching/noti',
  //       {},
  //       JSON.stringify({ receiverId: '좋아요보낸 상대 ID' }),
  //     );
  //     // stompClient.disconnect();
  //   });
  // };
  return (
    <div className="flex justify-center">
      <nav className="menu">
        <Link href="#" class="menu-item">
          <i className="bi bi-search-heart transition duration-300 hover:scale-125" />
          <i className="bi bi-search-heart-fill scale-125" />
        </Link>
        <Link href="#" class="menu-item">
          <i className="bi bi-chat-heart transition duration-300 hover:scale-125" />
          <i className="bi bi-chat-heart-fill scale-125" />
        </Link>
        {!mainNav && (
          <Link
            to="/main"
            className="flex w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full mx-auto my-auto shadow-md"
          >
            <img
              className="w-10 h-10 mx-auto my-auto"
              src="/pastelheart.png"
              alt=""
            />
          </Link>
        )}
        {mainNav && (
          <div className="flex w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full mx-auto my-auto shadow-md">
            <img
              className="w-10 h-10 mx-auto my-auto"
              src="/ommheart.png"
              alt=""
              onClick={() => {
                // sendMatch();
              }}
              aria-hidden="true"
            />
          </div>
        )}
        <div className="menu-item">
          {notiNav && <i className="bi bi-bell-fill scale-125" />}
          {!notiNav && (
            <Link to="/notification" class="menu-item">
              <i className="bi bi-bell transition duration-300 hover:scale-125" />
            </Link>
          )}
        </div>
        <div className="menu-item">
          {!profileNav && (
            <Link to="/Myprofile" class="menu-item">
              <i className="bi bi-person transition duration-300 hover:scale-125" />
            </Link>
          )}
          {profileNav && <i className="bi bi-person-fill scale-125" />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
