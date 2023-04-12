import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './nav-bar.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likey } from '../store/recSlice';
import http from '../api/http';
import ommheart from '../assets/ommheart.png';
import pastelheart from '../assets/pastelheart.png';

function Navbar({ profileNav, mainNav, notiNav, chatlistNav, likesNav, id }) {
  const token = localStorage.getItem('accesstoken');
  const decoded = jwt_decode(token);
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);

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
      Authorization: `Bearer ${token}`,
    };
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/matching`);
    let client = Stomp.over(ws);
    client.connect(
      headers,
      (frame) => {
        client.subscribe(
          `/sub/matching/chatalert/${decoded.sub}`,
          (message) => {
            const recv = JSON.parse(message.body);
            setChatAlert(recv.alert);
          },
          {},
        );

        client.subscribe(
          `/sub/matching/notialert/${decoded.sub}`,
          (message) => {
            const recv = JSON.parse(message.body);
            setNotiAlert(recv.alert);
          },
          {},
        );
      },
      (error) => {},
    );
    setStompClient(client);
  };
  const chatlistconnect = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/chat`);
    let client = Stomp.over(ws);
    client.connect(headers, (frame) => {
      client.subscribe(
        `/sub/chat/chatalert/${decoded.sub}`,
        (message) => {
          const recv = JSON.parse(message.body);
          setChatAlert(recv.alert);
        },
        {},
      );

      client.subscribe(
        `/sub/chat/notialert/${decoded.sub}`,
        (message) => {
          const recv = JSON.parse(message.body);
          setNotiAlert(recv.alert);
        },
        {},
      );
    });
    setStompClient(client);
  };

  const sendMatch = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    stompClient.send(
      '/pub/matching/noti',
      headers,
      JSON.stringify({ receiverId: id }),
    );
  };

  const like = async () => {
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
      .then(() => {
        dispatch(likey(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChatAlert = async () => {
    await http({
      method: 'get',
      url: '/alert/chat',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setChatAlert(res.data.alert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLikeAlert = async () => {
    await http({
      method: 'get',
      url: '/alert/noti',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setNotiAlert(res.data.alert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChatAlert();
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
        </div>
        <div className="menu-item">
          {!chatlistNav && (
            <i
              className={
                chatAlert
                  ? 'bi bi-chat-heart-fill'
                  : 'bi bi-chat-heart transition duration-300 hover:scale-125'
              }
              onClick={() => {
                gotoChattings();
              }}
              aria-hidden
            />
          )}
          {chatlistNav && <i className="bi bi-chat-heart-fill chatlistNav" />}
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
          {!notiNav && (
            <i
              className={
                notiAlert
                  ? 'bi bi-bell-fill'
                  : 'bi bi-bell transition duration-300 hover:scale-125'
              }
              onClick={() => {
                gotoNoti();
              }}
              aria-hidden
            />
          )}
          {notiNav && <i className="bi bi-bell-fill notiNav" />}
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
          {profileNav && <i className="bi bi-person-fill" />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
