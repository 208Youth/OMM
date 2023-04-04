import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import chat from '../../api/chat';
import http from '../../api/http';
import BottomModal from './BottomModal';
import ReportModal from './ReportModal';
import './ChatModal.css';

function ChatWindow() {
  // const [roomId, setRoomId] = useState(localStorage.getItem('wschat.roomId'));
  const [sender, setSender] = useState(localStorage.getItem('wschat.sender'));
  const [room, setRoom] = useState({});
  const location = useLocation();
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('accessoken');
  const headers = {
    Authorization: import.meta.env.VITE_TOKEN,
    // Authorization: token,
  };

  const testuser1 = 1;
  const testuser3 = 3;
  const token3 = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIweDc3ODZjZTVlODQxM2U2YWM3M2JmNGM3MjgzYjIwZjU3NDY0MGRjMTQiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxMDMyMDQ4Mjg0M30.UanoFHotHIJmavfVtJNDrpNZSAtST9aOWenfxI3j-juotGg-ElnRK7s1Tdu4IMQk1cnhXMXTWqh978ituAKGKg';

  // 임시로 메시지를 저장
  const [messages, setMessages] = useState([
    { senderId: 1, content: '자나요?', isRead: true },
    { senderId: 1, content: '술 마실래요', isRead: true },
    { senderId: 2, content: '저 입이 없어서 술 못마셔요 ㅜㅜ', isRead: true },
    { senderId: 1, content: '아 네', isRead: false },
    { senderId: 1, content: '카톡 할래요?', isRead: false },
    {
      senderId: 2,
      content: '저 와이파이가 안되서 카톡 못해요 ㅠㅠ',
      isRead: false,
    },
  ]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openReportModal = () => {
    setReportOpen(true);
  };

  const closeReportModal = () => {
    setReportOpen(false);
  };
  console.log(location);
  const roomId = location.pathname.substring(12, location.pathname.lastIndex);
  console.log(roomId);
  console.log(localStorage.getItem('wschat.roomId'));
  console.log(sender);

  const headers1 = {
    Authorization: import.meta.env.VITE_TOKEN,
    roomId,
    // Authorization: token,
  };

  const roomHeader = {
    roomId,
  };

  const headers1 = {
    Authorization: import.meta.env.VITE_TOKEN,
    roomId,
    // Authorization: token,
  };

  const roomHeader = {
    roomId,
  };

  const ws = new SockJS('http://localhost:5000/api/chat');
  // const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
  const stompClient = Stomp.over(ws);

  // 임시값으로 쁘띠재용을 받는다.
  const user2ID = '쁘띠재용';

  const findRoom = () => {
    http({
      method: 'get',
      url: `/chat/room/${roomId}`,
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
      },
    }).then((response) => {
      console.log('채탱방 정보를 가져옴');
      console.log(response);
      setRoom(response.data.roomInfo);
      console.log(response.data.roomInfo.msgs);
      setMessages([...response.data.payload]);
    }).catch((error) => { console.log(error); });
  };

  const sendMessage = () => {
    stompClient.send(
      `/pub/chat/room/${roomId}`,
      headers1,
      JSON.stringify({ roomId, receiverId: room.other.otherId, content: message }),
    );
    console.log('메시지 보냄');
    setMessage('');
  };

  const sendMessage1 = () => {
    stompClient.connect(headers1, (frame) => {
      stompClient.send(
        `/pub/chat/room/${roomId}`,
        headers,
        JSON.stringify({ roomId, senderId: testuser1, content: message }),
      );
      console.log('메시지 보냄');
      setMessage('');
    });
  };

  const sendMessage2 = () => {
    stompClient.connect({ headers1 }, (frame) => {
      stompClient.send(
        `/pub/chat/room/${roomId}`,
        { token3 },
        JSON.stringify({ roomId, senderId: testuser3, content: message }),
      );
      console.log('메시지 보냄');
      setMessage('');
    });
  };

  const recvReadDto = (readIndex) => {
    const { lastReadIndex } = readIndex;
    console.log(messages);
    console.log(`메세지길이.${messages.length}`);

    const copies = [...messages];

    for (let i = lastReadIndex; i < copies.length; i++) {
      copies[i].isRead = true;
    }

    setMessages(copies);
  };

  const recvMessage = (recv) => {
    console.log('받음?');
    console.log(recv);
    setMessages(() => [
      ...messages,
      recv,
    ]);
  };

  const connect = () => {
    const reconnect = 0;
    console.log('아래는 메시지');
    console.log(message);
    console.log('아래는 메시지 길이');
    console.log(messages.length);
    console.log('위는 메시지 길이');
    stompClient.connect(
      headers1,
      (frame) => {
        stompClient.subscribe('/sub/chat/entrance', (readDto) => {
          const readIndex = JSON.parse(readDto.body);
          recvReadDto(readIndex);
          console.log('커넥트');
        });

        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const recv = JSON.parse(message.body);
          recvMessage(recv);
        });
      },
      (error) => {
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
    findRoom();

    // axios
    //   .get(`http://localhost:5000/api/chat/room/${roomId}/messages`)
    //   .then(({ data }) => {
    //     console.log('아래는 data 정보');
    //     console.log({ data });
    //     console.log(...data);
    //     console.log('위는data 정보');
    //     setMessages([...data]);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    connect();
  }, []);

  return (
    <div className=" text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-extrabold text-[1.3rem]">
          {user2ID}
        </span>
      </div>
      <div className="flex mx-auto w-[20rem] h-[39rem] overscroll-x-none overflow-y-scroll scrollbar-hide touch-pan-y text-xs rounded-lg mb-1">
        <div id="chatdetail" className="w-[20rem] mx-auto">
          <div>{/* 만약 보낸사람이 내가 아니라면 */}</div>
          <div id="Chat">
            <div>
              {}
              <div>{room.id}</div>
              <ul>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`my-2 ${
                      msg.senderId === 1 ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.senderId === 1 ? (
                      <div className="font-sans ml-28">
                        <span className="text-[0.5rem] mr-1">
                          {msg.isRead ? '읽음' : '안읽음'}
                        </span>
                        <span className="bg-[#E1E3EB] p-2 rounded-lg">
                          <span className="font-sans">{msg.senderId}</span>
                          <span className="text-sm mr-2 font-sans font-bold">
                            {msg.content}
                            오른쪽
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="w-60 flex">
                        <div className="w-48 bg-[#E6C9C6] p-2 rounded-lg">
                          <span className="text-sm mr-2 font-sans font-bold">
                            왼쪽
                            {msg.content}
                          </span>
                          <span className="">{msg.senderId}</span>
                        </div>
                        <span className="text-[0.5rem] ml-1 self-end">
                          {msg.isRead ? '읽음' : '안읽음'}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex fixed bottom-0 ">
                <button
                  onClick={() => {
                    openModal();
                  }}
                  className="flex justify-center items-center h-12 w-12 relative bg-[#F2EAF2] rounded-full m-1 hover:border"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.25rem"
                    height="1.25rem"
                    fill="currentColor"
                    className="bi bi-plus-lg text-[#364C63]"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="rounded-md bg-[#F2EAF2] w-60 h-11 self-center"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                {/* <button onClick={sendMessage}>Send</button> */}

                <button
                  className="flex justify-center items-center h-12 w-12 relative bg-[#F2EAF2] rounded-full m-1 hover:border"
                  onClick={sendMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.25rem"
                    height="1.25rem"
                    fill="currentColor"
                    className="bi bi-send-fill text-[#364C63]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                </button>
                <button
                  className="flex justify-center items-center h-12 w-12 relative bg-[#F2EAF2] rounded-full m-1 hover:border"
                  onClick={sendMessage1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.25rem"
                    height="1.25rem"
                    fill="currentColor"
                    className="bi bi-send-fill text-[#364C63]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                  1
                </button>
                <button
                  className="flex justify-center items-center h-12 w-12 relative bg-[#F2EAF2] rounded-full m-1 hover:border"
                  onClick={sendMessage2}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.25rem"
                    height="1.25rem"
                    fill="currentColor"
                    className="bi bi-send-fill text-[#364C63]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                  2
                </button>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="BottomModal"
              overlayClassName="KakaomapOverlay"
              ariaHideApp={false}
            >
              <BottomModal
                setModal={() => {
                  closeModal();
                }}
                setReportModal={() => {
                  openReportModal();
                }}
              />
            </Modal>
          </div>
          <Modal
            isOpen={reportOpen}
            onRequestClose={closeReportModal}
            className="KakaomapModal"
            overlayClassName="KakaomapOverlay"
            ariaHideApp={false}
          >
            <ReportModal
              setReportModal={() => {
                closeReportModal();
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
