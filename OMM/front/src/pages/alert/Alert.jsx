import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import { useNavigate, useLocation } from 'react-router-dom';
import Stomp from 'stompjs';
import jwt_decode from 'jwt-decode';
import AOS from 'aos';
import Navbar from '../../components/nav-bar';
import AlertMsg from '../../components/AlertMsg';
import '../../components/AlertMsg.css';
import http from '../../api/http';

function Alert() {
  const [alertlist, setAlertList] = useState([]);
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate();
  const connect = () => {
    /*
    페이지 렌더링 후 실행되는 connect()
    /chat/rooms 라는 경로를 구독하겠다
    구독한 채널에서 Publish된 메세지가 왔을 때
    처리 (recvRoom())
    */
    // const ws = new SockJS('http:localhost:5000/api/matching');
    const ws = new SockJS(`${import.meta.env.VITE_OMM_URL}/api/matching`);
    const stompClient = Stomp.over(ws);
    // 유저 3 토큰
    const token = localStorage.getItem('accesstoken');
    const decoded = jwt_decode(token);
    const headers = {
      // Authorization: import.meta.env.VITE_TOKEN,
      Authorization: `Bearer ${token}`,
    };
    stompClient.connect(
      headers,
      (frame) => {
        stompClient.subscribe(
          `/sub/matching/noti/${decoded.sub}`,
          (message) => {
            const recv = JSON.parse(message.body);
            console.log('내가 받은 메세지: ');
            console.log(recv);
            setAlertList((prev) => {
              const newList = [recv, ...prev];
              return newList;
            });
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
  };

  const deletemsg = (msg) => {
    console.log('삭제할거야');
    setAlertList(alertlist.filter((alert) => alert.id !== msg.id));
    console.log('삭제보낼거', msg);
    http({
      method: 'delete',
      url: '/matching/noti',
      data: msg,
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function getAlerts() {
    await http({
      method: 'get',
      url: '/matching/noti',
      headers: {
        // Authorization: import.meta.env.VITE_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log('기존 알림가져옴', res.data.list);
        if (res.data.list) {
          setAlertList(res.data.list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    connect();
    getAlerts();
  }, []);

  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    console.log('알림변경됨', alertlist);
  }, [alertlist]);

  function handleGoBack() {
    navigate('/main');
  }
  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span
          className="hover:cursor-pointer"
          onClick={handleGoBack}
          aria-hidden
        >
          <span>&lt;</span>
          <span className="font-sans ml-3 font-bold">Notification</span>
        </span>
      </div>
      <div className="mx-6 text-lg mb-3" id="msgs">
        <div className="mt-3">
          {alertlist
            && alertlist.map((msg) => (
              <div data-aos="fade-up">
                <AlertMsg
                  msg={msg}
                  deletemsg={(res) => {
                    if (res) {
                      deletemsg(res);
                    }
                  }}
                />
              </div>
            ))}
          {alertlist.length === 0 && (
            <div className="h-[22.5rem] flex justify-center" data-aos="zoom-in">
              <div className="flex-col my-auto text-center text-md">
                <div>메인에서 아래의 하트를 눌러</div>
                <div>매칭을 보내보세요!</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navbar notiNav />
    </div>
  );
}

export default Alert;
