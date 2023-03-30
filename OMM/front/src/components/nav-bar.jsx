import React, { useRef } from 'react';
import SockJS from 'sockjs-client';
// import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import './nav-bar.scss';
import { Link } from 'react-router-dom';

function Navbar({ profileNav, mainNav, notiNav, chatlistNav }) {
  // let ws = new SockJS('http://localhost:5000/api/matching', null, {
  //   transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
  // });

  const sendMatch = () => {
    const ws = new SockJS('http://localhost:5000/api/matching');
    const stompClient = Stomp.over(ws);
    // redux 에서 첫번째사람 지우는 함수 작성
    // match 알림 보내기
    stompClient.connect({}, (frame) => {
      stompClient.send(
        '/api/pub/matching/noti',
        {},
        JSON.stringify({ receiverId: 1 }),
      );
      // stompClient.disconnect();
    });
  };

  return (
    <div className="flex justify-center">
      <nav className="menu">
        <Link to="#" className="menu-item">
          <i className="bi bi-search-heart transition duration-300 hover:scale-125" />
          <i className="bi bi-search-heart-fill scale-125" />
        </Link>
        <div className="menu-item">
          {!chatlistNav && (
            <Link
              to="/chattings"
              className="transition duration-300 hover:scale-125"
            >
              <i className="bi bi-chat-heart" />
            </Link>
          )}
          {chatlistNav && <i className="bi bi-chat-heart-fill scale-125" />}
        </div>
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
                sendMatch();
              }}
              aria-hidden="true"
            />
          </div>
        )}
        <div className="menu-item">
          {notiNav && <i className="bi bi-bell-fill scale-125" />}
          {!notiNav && (
            <Link to="/notification" className="menu-item">
              <i className="bi bi-bell transition duration-300 hover:scale-125" />
            </Link>
          )}
        </div>
        <div className="menu-item">
          {!profileNav && (
            <Link to="/Myprofile" className="menu-item">
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
