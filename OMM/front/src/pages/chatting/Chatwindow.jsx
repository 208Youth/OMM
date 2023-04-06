import React, { useEffect, useLayoutEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Modal from 'react-modal';
import {
  useLocation, useNavigate,
} from 'react-router-dom';
import http from '@/api/http.js';
import BottomModal from '@/pages/chatting/BottomModal';
import ReportModal from '@/pages/chatting/ReportModal';
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
  const [otherImage, setOtherImage] = useState('');

  function setrecenctmes() {
    // 태그의 클래스를 이용하여 선택하기
    const chatBox = document.querySelector('#recentChat');

    // 스크롤을 마지막으로 이동하기
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  // 내가 보낸 채팅만 읽음 안읽음 처리하기 위한 로직
  // 1.채팅 목록을 역순으로 정렬합니다.
  // 2. 반복문을 사용하여 채팅 목록을 출력합니다.
  // 3. 내가 보낸 채팅 중에서 가장 최근에 보낸 채팅을 찾습니다.
  // 4. 내가 보낸 채팅이면서 가장 최근에 보낸 채팅인 경우에만 "읽음" 혹은 "안읽음" 정보를 보여줍니다.

  const myChatList = messages.filter((chat1) => chat1.senderId !== room.other.otherId);
  console.log(messages);
  console.log(myChatList);

  const latestMyChat = myChatList.find((chat1) => chat1.read === false);
  console.log(latestMyChat);
  const openModal = () => {
    setIsOpen(true);
  };
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }
  const closeModal = () => {
    setIsOpen(false);
  };

  const openReportModal = () => {
    setReportOpen(true);
  };

  const closeReportModal = () => {
    setReportOpen(false);
  };
  const [lastchatindex, setLastchatindex] = useState(-1);

  useEffect(() => {
    arrivalChat && setMessages((prev) => [...prev, arrivalChat]);
    setTimeout(() => {
      setrecenctmes();
    }, 1);
    setLastchatindex(messages.length);
    // 채팅 리스트에 추가
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
  // 아래는 read처리를 위한 fastapi의 조언, 저 함수는 다른 유자거 들어 올떄 실행되야함
  const markAsRead = (messageId) => {
    const updatedMessages = messages.map((message) => (message.id === messageId ? { ...message, read: true } : message));
    setMessages(updatedMessages);
  };

  // const ws = new SockJS('http://localhost:5000/api/chat');
  const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
  const stompClient = Stomp.over(ws);

  // useEffect(
  //   () => () => {
  //     http.get('/chat/test').then((res) => {
  //       console.log('요청함');
  //     });
  //   },
  //   [location, stompClient],
  // );

  const connect = () => {
    console.log('connect');
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
        // console.log(response.data.roomInfo.other.image.imageContent);
        setMessages([...response.data.payload]);
        setRoom(response.data.roomInfo);
        setOtherNickname(response.data.roomInfo.other.nickname);
        // console.log(response.data.roomInfo.other);
        if (response.data.roomInfo.other.image.imageContent) {
          setOtherImage(response.data.roomInfo.other.image.imageContent);
        }
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
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    const stompClient = Stomp.over(ws);
    ws.onmes = () => {
      console.log('WebSocket connected!!!');
    };
    findRoom();
    connect();
  }, []);

  return (
    <div className=" text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div onClick={handleGoBack} className="text-2xl mx-6 py-8 hover:cursor-pointer ">
        <span>&lt;</span>

        <span className="ml-3 font-sans font-extrabold text-[1.3rem]">
          {otherNickname}
        </span>
      </div>
      <div id="recentChat" className="flex mx-auto w-[20rem] h-[39rem] overscroll-x-none overflow-y-scroll scrollbar-hide touch-pan-y text-xs rounded-lg mb-1">
        <div id="chatdetail" className="w-[20rem] mx-auto">
          <div>{/* 만약 보낸사람이 내가 아니라면 */}</div>
          <div id="Chat">
            <div>
              {}
              {/* <div>{room.id}</div>
              <div>{room.id}</div> */}
              <ul>
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`my-2 ${
                      // 아래 코드 주의
                      msg.senderId !== room.other.otherId ? 'text-right' : 'text-left'
                    } ${lastchatindex === index ? '' : ''}`}
                  >
                    {msg.senderId !== room.other.otherId ? (
                      <div className="w-60 flex font-sans ml-20 justify-end">

                        {lastchatindex === index && (
                        <span id="readen" className="text-[0.5rem] mr-1 self-end">

                          {msg.read ? '' : '안읽음'}
                        </span>

                        )}

                        {/* {msg === latestMyChat && (
                          <span className="text-[0.5rem] ml-1 self-end">
                            {msg.read ? '읽음' : '안읽음'}
                          </span>
                        )} */}

                        <div className="max-w-[12.5rem]  inline-block bg-gray-200 p-2 rounded-lg">

                          <span className="text-sm font-sans font-bold break-words whitespace-pre-line">
                            {msg.content}
                            {' '}

                          </span>

                        </div>
                        {/* <span className="font-sans">{msg.senderId}</span> */}
                      </div>
                    ) : (
                      <div className="w-60 flex flex-row">
                        <span className="ml-[0.3rem]">
                          <div className="flex flex-row">

                            {otherImage ? (
                              <span>
                                <img src={`data:image/png;base64,${otherImage}`} alt="slide_image" className="w-9 h-9 rounded-full mb-2 self-center" />
                              </span>

                            ) : (

                              <span>
                                <img src="../../../public/defaultimage.png" alt="defualt_image" className="w-9 h-9 rounded-full mb-2 self-center" />
                              </span>
                            )}
                            <div className="flex flex-col">

                              <div className="font-mono ml-2 mb-1 ">{otherNickname}</div>
                              <span className="text-sm ml-2 mr-2 font-sans font-bold break-words max-w-[12.5rem] inline-block bg-[#E6C9C6] p-2 rounded-lg m">

                                {msg.content}
                              </span>
                            </div>
                          </div>

                        </span>

                        <span className="text-[0.5rem] ml-1 self-end">
                          {/* {msg.isRead ? '' : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                            </svg>
                          )} */}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex fixed bottom-0 ml-[0.2rem] pt-5">
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
                targetId={room?.other?.otherId}
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
