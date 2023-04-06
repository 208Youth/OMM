/* eslint-disable */
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import ChatingRoomClone from './ChatingRoomClone';
import chat from '../../api/chat';

function ChatingRobbyClone() {
  const [chatRooms, setChatRooms] = useState([]);
  const [showChat, setShowChat] = useState(false);

  // const ws = new SockJS('http://localhost:5000/api/chat');
  const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
  const stompClient = Stomp.over(ws);

  const findAllRoom = () => {
    chat.get('/rooms').then((response) => {
      console.log('findallRoom 함수 실행됨', response);
      setChatRooms(response.data);
    });
  };
  // axios.get('http://localhost:5000/api/chat/rooms')
  //   .then((response) => {
  //     console.log('findallRoom 함수 실행됨', response);
  //     setChatRooms(response.data);
  //   });

  const recvRoom = (recv) => {
    console.log(recv);
    setChatRooms((chatRooms) => [recv, ...chatRooms]);
    console.log('위는 recv, 아래는 chatrooms');
    console.log(chatRooms);
  };

  const connect = () => {
    const reconnect = 0;
    /*
      페이지 렌더링 후 실행되는 connect()
      /chat/rooms 라는 경로를 구독하겠다
      구독한 채널에서 Publish된 메세지가 왔을 때
      처리 (recvRoom())
    */
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe('/sub/chat/rooms', (message) => {
          const recv = JSON.parse(message.body);
          console.log(recv);
          recvRoom(recv);
        });
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

  useEffect(() => {
    console.log('안먹히는 유스이펙트');
    connect();
    findAllRoom();
  }, []);

  // 방 만들기
  const createRoom = () => {
    /*
      소켓 연결
      /chat으로 가는 요청에 대해 소켓 연결 설정
    */
    // const ws = new SockJS('http://localhost:5000/api/chat');
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    const stompClient = Stomp.over(ws);

    /*
      /chat/rooms를 구독하고 있는 Subscriber들을 대상으로
      {userId: [1, 2]} 객체를 Publish 하겠다.
    */
    stompClient.connect({}, (frame) => {
      stompClient.send(
        '/api/pub/chat/rooms',
        {},
        JSON.stringify({ userIds: [1, 2] }),
      );
      // stompClient.disconnect();
    });
  };

  const enterRoom = (roomId) => {
    /*
      Test용 채팅방에서 쓸 user id 입력 - Long 타입으로
      TODO: 알림 보낸 상대의 user id만 객체로 묶어 보내주기
    */
    const sender = prompt('대화명을 입력해 주세요.');
    if (sender !== '') {
      localStorage.setItem('wschat.sender', sender);
      localStorage.setItem('wschat.roomId', roomId);
      stompClient.send(
        '/api/pub/chat/entrance',
        {},
        JSON.stringify({ roomId }),
      );

      setShowChat(true);
    } else return;
  };

  return (
    <div>
      {showChat ? (
        <ChatingRoomClone />
      ) : (
        <div>
          <h2>"user1"이 "user2"와 같이 채팅하는 방을 만들어용</h2>
          <button onClick={createRoom}>방 생성</button>
          <ul>
            {chatRooms.map((chatRoom) => (
              <li key={chatRoom.id}>
                <span>{chatRoom.id}</span>
                <button onClick={() => enterRoom(chatRoom.id)}>입장</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChatingRobbyClone;
