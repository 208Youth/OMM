import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
// import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router';

function WaitChat() {
  // const [load, setLoad] = useState(null);
  const [chatid, setChatId] = useState(null);
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate();

  let stompClient;

  const websocket = () => {
    // const ws = new SockJS('http://localhost:5000/api/chat');
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`,
    };
    stompClient = Stomp.over(ws);

    stompClient.connect(
      headers,
      (frame) => {
        console.log('연결성공');
      },
      (error) => {
        // 연결이 끊어졌을 때 재연결 시도 부분
        // 필요할 때 쓰면 될 듯.
        // if(reconnect++ < 5) {
        //   setTimeout(function() {
        //     console.log("connection reconnect");
        //     connect();
        //   },10*1000);
        // }
      },
    );
  };

  const createChatting = () => {
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`, // 매칭 수락한사람의 토큰
    };
    console.log(stompClient);
    const decoded = jwt_decode(token);
    stompClient.connect(headers, (frame) => {
      stompClient.subscribe(`/sub/chat/room/${decoded.sub}`, (message) => {
        console.log(message);
        const recv = JSON.parse(message.body);
        console.log(recv);
        console.log('채팅 내용 수신', recv.id);
        navigate(`/Chatwindow/${recv.id}`);
        // 리다이렉트 또는 다른 작업 수행
      });
      stompClient.send(
        '/pub/chat/room',
        headers,
        // 나한테 알림 보낸사람 id
        JSON.stringify({ senderId: 502 }),
        console.log('채팅방 만들라구'),
      );
    });
    console.log(stompClient);
  };

  // const subconnect = async () => {
  //   const headers = {
  //     Authorization: import.meta.env.VITE_TOKEN_3, // 매칭 수락한사람의 토큰
  //   };
  //   const token3 =
  //     '0x7786ce5e8413e6ac73bf4c7283b20f574640dc14eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIweDc3ODZjZTVlODQxM2U2YWM3M2JmNGM3MjgzYjIwZjU3NDY0MGRjMTQiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzY2NzQxODMyfQ.7BnOYQdP1p9_VDVnehTnGoIsEmpG2OZ31ONBbdWh03ap0XX7fDbuZCtDhT2xDGh_xLYWVksqkzFlN8hDBKPhUQ';
  //   const decoded = jwt_decode(token3);
  //   console.log('해독됨', decoded.sub);
  //   await stompClient.connect(
  //     headers,
  //     (frame) => {
  //       stompClient.subscribe(
  //         `/sub/chat/room/${decoded.sub}`,
  //         (message) => {
  //           const recv = JSON.parse(message.body);
  //           console.log('이거뜨면 진짜끝', recv);
  //           setChatId(recv.id);
  //         },
  //         {},
  //       );
  //       console.log('성공인가요.');
  //       console.log(chatid);
  //     },
  //     (error) => {
  //       // 연결이 끊어졌을 때 재연결 시도 부분
  //       // 필요할 때 쓰면 될 듯.
  //       // if(reconnect++ < 5) {
  //       //   setTimeout(function() {
  //       //     console.log("connection reconnect");
  //       //     connect();
  //       //   },10*1000);
  //       // }
  //     },
  //   );
  //   // .then(
  //   //   setTimeout(() => {
  //   //     navigate(`/Chatwindow/:${chatid}`);
  //   //   }, 1000),
  //   // );
  // };
  const subconnect = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    stompClient.connect(
      headers,
      (frame) => {
        console.log('sub 하기전', decoded.sub);
      },
      (error) => {
        console.log('연결 실패', error);
      },
    );
  };

  useEffect(() => {
    websocket();
    createChatting();
    // subconnect();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          createChatting();
        }}
      >
        채팅방 생성
      </button>
    </div>
  );
}

export default WaitChat;
