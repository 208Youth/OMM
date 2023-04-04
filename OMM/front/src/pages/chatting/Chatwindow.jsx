import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  const [arrivalChat, setArrivalChat] = useState(null); // 도착한 메세지 저장
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('accesstoken');
  // 임시로 메시지를 저장
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [otherNickname, setOtherNickname] = useState('');

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

  useEffect(() => {
    arrivalChat && setMessages((prev) => [...prev, arrivalChat]); // 채팅 리스트에 추가
  }, [arrivalChat]);

  const roomId = location.pathname.substring(12, location.pathname.lastIndex);

  const headers = {
    Authorization: `Bearer ${token}`,
    roomId,
    // Authorization: token,
  };

  const roomHeader = {
    roomId,
  };

  // const ws = new SockJS('http://localhost:5000/api/chat');
  const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
  const stompClient = Stomp.over(ws);

  useEffect(
    () => () => {
      http.get('/chat/test').then((res) => {
        console.log('요청함');
      });
    },
    [location, stompClient],
  );

  const connect = () => {
    stompClient.connect(
      headers,
      (frame) => {
        stompClient.subscribe(
          `/sub/chat/room/${roomId}/entrance`,
          (readDto) => {},
        );

        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const recv = JSON.parse(message.body);
          setArrivalChat(recv);
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

  const findRoom = () => {
    http({
      method: 'get',
      url: `/chat/room/${roomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('채팅방 정보를 가져옴');
        console.log(response);
        // setRoom(response.data.roomInfo);
        console.log(response.data.roomInfo.msgs);
        setMessages([...response.data.payload]);
        setRoom(response.data.roomInfo);
        setOtherNickname(response.data.roomInfo.other.nickname);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const waitForConnection = (stompClient, callback) => {
    setTimeout(() => {
      // 연결되었을 때 콜백함수 실행
      if (stompClient.ws.readyState === 1) {
        callback();
        // 연결이 안 되었으면 재호출
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 1); // 밀리초 간격으로 실행
  };

  const sendMessage = () => {
    // stompClient.connect(headers, (frame) => {
    waitForConnection(stompClient, () => {
      stompClient.send(
        `/pub/chat/room/${roomId}`,
        headers,
        JSON.stringify({
          roomId,
          receiverId: room.other.otherId,
          content: message,
        }),
      );
    });
    setMessage('');
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
    console.log(recv);
    const tempMsgs = [...messages, recv];
    setMessages([...tempMsgs]);
  };

  useEffect(() => {
    findRoom();
    connect();
  }, []);

  return (
    <div className=" text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-extrabold text-[1.3rem]">
          {otherNickname}
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
                    {msg.senderId != room.other.otherId ? (
                      <div className="font-sans ml-28">
                        <span className="text-[0.5rem] mr-1">
                          {msg.read ? '읽음' : '안읽음'}
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
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
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
