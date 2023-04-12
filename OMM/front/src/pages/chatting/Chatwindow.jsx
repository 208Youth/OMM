import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
import http from '../../api/http';
import BottomModal from './BottomModal';
import ReportModal from './ReportModal';
import './ChatModal.css';
import ommheart from '../../assets/ommheart.png';

function ChatWindow() {
  const [room, setRoom] = useState({});
  const location = useLocation();
  const [arrivalChat, setArrivalChat] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('accesstoken');

  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [otherNickname, setOtherNickname] = useState('');
  const [otherImage, setOtherImage] = useState('');

  function setrecenctmes() {
    const chatBox = document.querySelector('#recentChat');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  const openModal = () => {
    setIsOpen(true);
  };
  const navigate = useNavigate();
  function handleGoBack() {
    navigate('/chattings');
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
    setMessages((prev) => [...prev, arrivalChat]);
    setTimeout(() => {
      setrecenctmes();
    }, 1);
    setLastchatindex(messages.length);
  }, [arrivalChat]);

  const roomId = location.pathname.substring(12, location.pathname.lastIndex);

  const headers = {
    Authorization: `Bearer ${token}`,
    roomId,
  };

  const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
  const stompClient = Stomp.over(ws);

  const connect = () => {
    let reconnect = 0;
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
        if (reconnect++ < 5) {
          setTimeout(() => {
            connect();
          }, 10 * 1000);
        }
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
        setMessages([...response.data.payload]);
        setRoom(response.data.roomInfo);
        setOtherNickname(response.data.roomInfo.other.nickname);
        if (response.data.roomInfo.other.image) {
          setOtherImage(response.data.roomInfo.other.image);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const waitForConnection = (stompClient, callback) => {
    setTimeout(() => {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 1);
  };

  const sendMessage = () => {
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

  useEffect(() => {
    findRoom();
    connect();
    return function cleanup() {
      // stompClient.unsubscribe();
      // stompClient.disconnect();
    };
  }, []);

  return (
    <div className=" text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div
        onClick={handleGoBack}
        className="text-2xl mx-6 py-8 hover:cursor-pointer"
        aria-hidden
      >
        <span>&lt;</span>

        <span className="ml-3 font-sans font-extrabold text-[1.3rem]">
          {otherNickname}
        </span>
      </div>
      <div
        id="recentChat"
        className="flex mx-auto w-[20rem] h-[39rem] overscroll-x-none overflow-y-scroll scrollbar-hide touch-pan-y text-xs rounded-lg mb-1"
      >
        <div id="chatdetail" className="w-[20rem] mx-auto">
          <div id="Chat">
            <div>
              <ul>
                {messages?.map((msg, index) => (
                  <li
                    key={index}
                    className={`my-2 ${
                      msg?.senderId !== room?.other?.otherId
                        ? 'text-right'
                        : 'text-left'
                    } ${lastchatindex === index ? '' : ''}`}
                  >
                    {msg?.senderId !== room?.other?.otherId ? (
                      <div className="w-60 flex font-sans ml-20 justify-end">
                        {lastchatindex === index && (
                          <span
                            id="readen"
                            className="text-[0.5rem] mr-1 self-end"
                          >
                            {msg?.read ? '' : '안읽음'}
                          </span>
                        )}
                        <div className="max-w-[12.5rem]  inline-block bg-gray-200 p-2 rounded-lg">
                          <span className="text-sm font-sans font-bold break-words whitespace-pre-line">
                            {msg?.content}{' '}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-60 flex flex-row">
                        <span className="ml-[0.3rem]">
                          <div className="flex flex-row">
                            {otherImage ? (
                              <span>
                                <img
                                  src={`data:image/png;base64,${otherImage}`}
                                  alt="slide_image"
                                  className="w-9 h-9 rounded-full mb-2 self-center"
                                />
                              </span>
                            ) : (
                              <span>
                                <img
                                  src={ommheart}
                                  alt="defualt_image"
                                  className="w-9 h-9 rounded-full mb-2 self-center"
                                />
                              </span>
                            )}
                            <div className="flex flex-col">
                              <div className="font-mono ml-2 mb-1 ">
                                {otherNickname}
                              </div>
                              <span className="text-sm ml-2 mr-2 font-sans font-bold break-words w-fit max-w-[12.5rem] inline-block bg-[#E6C9C6] p-2 rounded-lg m">
                                {msg?.content}
                              </span>
                            </div>
                          </div>
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex fixed bottom-0 mx-auto pt-5">
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
                  className="rounded-md bg-[#F2EAF2] w-60 h-11 self-center pl-2"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
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
              targetId={room?.other?.otherId}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
