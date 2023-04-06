import React, { useRef, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import SockJS from 'sockjs-client';
// import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import './nav-bar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likey } from '@/store/recSlice';
import http from '@/api/http';
import ommheart from '../assets/ommheart.png';
import pastelheart from '../assets/pastelheart.png';

function Navbar({ profileNav, mainNav, notiNav, chatlistNav, likesNav, id }) {
  const token = localStorage.getItem('accesstoken');
  const decoded = jwt_decode(token);
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);
  /**
   * 채팅 알림, 좋아요 알림 useState
   */
  const [chatAlert, setChatAlert] = useState(false);
  const [notiAlert, setNotiAlert] = useState(false);
  const [heartState, setHeartState] = useState();

  const unfilledheart = 'bi-chat-heart transition duration-300 hover:scale-125';
  const filledheart = 'bi-chat-heart-fill';

  const navigate = useNavigate();

  const gotoLikes = () => {
    navigate('/likes');
  };
  const gotoChattings = () => {
    navigate('/chattings');
  };
  const gotoNoti = () => {
    navigate('/notification');
  };
  const gotoMyProfile = () => {
    navigate('/myprofile');
  };
  const gotoMain = () => {
    navigate('/main');
  };

  useEffect(() => {
    if (chatAlert) {
      setHeartState(filledheart);
    } else {
      setHeartState(unfilledheart);
    }
  }, [chatAlert]);

  const mainconnect = () => {
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`,
    };
    // const ws = new SockJS('http://localhost:5000/api/matching');
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/matching`);
    let client = Stomp.over(ws);
    client.connect(
      headers,
      (frame) => {
        console.log('mainconnect');
        client.subscribe(
          `/sub/matching/chatalert/${decoded.sub}`,
          (message) => {
            /**
             * TODO : 채팅 알림 있는지
             * 안읽은 채팅 존재 여부 -> setChatAlert
             */
            if (message.alert) console.log('나 안읽은 채팅이 있다요');
            setChatAlert(message.alert);
          },
          {},
        );

        client.subscribe(
          `/sub/matching/notialert/${decoded.sub}`,
          (message) => {
            /**
             * TODO : 알림 있는지
             * 알림 존재 여부 -> setnotiAlert
             */
            if (message.alert) console.log('나 받은 알림이 있다요');
            setNotiAlert(message.alert);
          },
          {},
        );
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
    setStompClient(client);
  };
  const chatlistconnect = () => {
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`,
    };
    // const ws = new SockJS('http://localhost:5000/api/chat');
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    let client = Stomp.over(ws);
    client.connect(
      headers,
      (frame) => {
        console.log('chatlistconnect');
        client.subscribe(
          `/sub/chat/chatalert/${decoded.sub}`,
          (message) => {
            /**
             * TODO : 채팅 알림 있는지
             * 안읽은 채팅 존재 여부 -> setChatAlert
             */
            if (message.alert) console.log('나 안읽은 채팅이 있다요');
            setChatAlert(message.alert);
          },
          {},
        );

        client.subscribe(
          `/sub/chat/notialert/${decoded.sub}`,
          (message) => {
            /**
             * TODO : 알림 있는지
             * 알림 존재 여부 -> setnotiAlert
             */
            if (message.alert) console.log('나 받은 알림이 있다요');
            setNotiAlert(message.alert);
          },
          {},
        );
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
    setStompClient(client);
  };

  const sendMatch = () => {
    // redux 에서 첫번째사람 지우는 함수 작성
    // match 알림 보내기
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`,
    };
    console.log(stompClient);
    stompClient.send(
      '/pub/matching/noti',
      headers,
      // 좋아요 할 사람 id
      JSON.stringify({ receiverId: id }),
      // JSON.stringify({ receiverId: 503 }),
    );
    console.log(stompClient);
    // stompClient.disconnect();
  };
  // const sendMatch = async () => {
  //   await axios
  //     .get('member/1')
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('에러 발생');
  //       console.log(error);
  //     });
  // };
  const like = async function () {
    const data = {
      sender_id: id,
      favor: true,
    };
    await http({
      method: 'post',
      url: '/recommend',
      headers: { Authorization: `Bearer ${token}` },
      data,
    })
      .then((res) => {
        console.log('조아요오오오', res);
        dispatch(likey(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * 처음 렌더링 시 내 안읽은 채팅 있는지 확인
   */
  const getChatAlert = async () => {
    await http({
      method: 'get',
      url: '/alert/chat',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log('출력해보렴', res);
        setChatAlert(res.data.alert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * 처음 렌더링 시 내 알림 있는지 확인
   */
  const getLikeAlert = async () => {
    await http({
      method: 'get',
      url: '/alert/noti',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log('출력해보렴', res);
        setNotiAlert(res.data.alert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    /**
     * 내게 온 채팅 알림 초기화
     */
    getChatAlert();
    /**
     * 내게 온 알림 초기화
     */
    getLikeAlert();
    if (mainNav) {
      mainconnect();
    } else if (chatlistNav) {
      chatlistconnect();
    }
  }, []);

  return (
    <div className="flex justify-center">
      <nav className="menu">
        <div className="menu-item">
          <i
            className={
              likesNav
                ? 'bi bi-search-heart-fill'
                : 'bi bi-search-heart transition duration-300 hover:scale-125'
            }
            onClick={() => {
              if (!likesNav) {
                gotoLikes();
              }
            }}
            aria-hidden
          />
          {/* {!likesNav && (
            <i
              className="bi bi-search-heart transition duration-300 hover:scale-125"
              onClick={() => {
                gotoLikes();
              }}
              aria-hidden
            />
          )}
          {likesNav && <i className="bi bi-search-heart-fill" />} */}
        </div>
        <div className="menu-item">
          <i
            className={
              chatlistNav
                ? 'bi bi-chat-heart-fill chatlistNav'
                : 'bi bi-chat-heart transition duration-300 hover:scale-125'
            }
            onClick={() => {
              if (!chatlistNav) {
                gotoChattings();
              }
            }}
            aria-hidden
          />
          {/* {chatlistNav && <i className="bi bi-chat-heart-fill chatlistNav" />} */}
        </div>
        <div className="menu-item">
          {!mainNav && (
            <div className="flex w-16 h-16 transition duration-500 hover:scale-110 rounded-full mx-auto my-auto">
              <img
                className="w-10 h-10 mx-auto my-auto"
                src={pastelheart}
                alt=""
                onClick={() => {
                  gotoMain();
                }}
                aria-hidden
              />
            </div>
          )}
          {mainNav && (
            <div className="flex w-16 h-16 transition duration-500 hover:scale-110 bg-red-100 rounded-full mx-auto my-auto shadow-md">
              <img
                className="w-10 h-10 mx-auto my-auto"
                src={ommheart}
                alt=""
                onClick={() => {
                  sendMatch();
                  like();
                }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="menu-item">
          {/* {!notiNav && !notiAlert && (
            <i
              className="bi bi-bell transition duration-300 hover:scale-125"
              onClick={() => {
                gotoNoti();
              }}
              aria-hidden
            />
          )}
          {!notiNav && notiAlert && (
            <i
              className="bi bi-bell-fill"
              onClick={() => {
                gotoNoti();
              }}
              aria-hidden
            />
          )} */}
          {!notiNav && (
            <i
              className={notiAlert ? "bi bi-bell-fill" : "bi bi-bell transition duration-300 hover:scale-125"}
              onClick={() => {
                gotoNoti();
              }}
              aria-hidden
            />
          )}

          {notiNav && (
            <i className="bi bi-bell-fill notiNav" />
          )}
        </div>
        <div className="menu-item">
          {!profileNav && (
            <i
              className="bi bi-person transition duration-300 hover:scale-125"
              onClick={() => {
                gotoMyProfile();
              }}
              aria-hidden
            />
          )}
          {profileNav && (
            <i className="bi bi-person-fill" />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
