import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Navbar from '../../components/nav-bar';
import AlertMsg from '../../components/AlertMsg';
import '../../components/AlertMsg.css';
import http from '../../api/http';

function Alert() {
  const [alertlist, setAlertList] = useState([]);
  const connect = () => {
    /*
    페이지 렌더링 후 실행되는 connect()
    /chat/rooms 라는 경로를 구독하겠다
    구독한 채널에서 Publish된 메세지가 왔을 때
    처리 (recvRoom())
    */
    const ws = new SockJS('http:localhost:5000/api/matching');
    const stompClient = Stomp.over(ws);
    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaWQ6ZXRocjpnb2VybGk6MHgwM2RmOGU1NGEzMGUzOTA2ZDI0M2Q3NDAyYzU5YjgyYjVkODU0MjIzYmEzYWU5NjllYTIzZDJjMTJiOGRhNDljNWUiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjgwMzQ5NTQ3fQ.j9jodZrhQuHRPYsS2UYc-saB6TEUUd8x0c_QKlgt1hr_-PFmsU7RVawZwI8niwmAitfeVO1GKdKUlQhbabh6fg';
    const decoded = jwt_decode(token);
    const headers = {
      Authorization: import.meta.env.VITE_TOKEN,
    };
    stompClient.connect(
      headers,
      (frame) => {
        stompClient.subscribe(
          `/sub/matching/noti/${decoded.sub}`,
          (message) => {
            const recv = JSON.parse(message.body);
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
        Authorization: import.meta.env.VITE_TOKEN,
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
        Authorization: import.meta.env.VITE_TOKEN,
      },
    }).then((res) => {
      console.log('기존 알림가져옴', res.data.list);
      if (res.data.list) {
        setAlertList(res.data.list);
      }
    });
  }

  useEffect(() => {
    connect();
    getAlerts();
  }, []);

  useEffect(() => {
    console.log('알림변경됨', alertlist);
  }, [alertlist]);

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="font-sans ml-3 font-bold">Notification</span>
      </div>
      <div className="mx-6 text-lg mb-3" id="msgs">
        <div className="mt-3">
          {alertlist &&
            alertlist.map((msg) => (
              <div>
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
          {/* <AlertMsg deletemsg={false} /> */}
        </div>
      </div>
      <Navbar notiNav />
    </div>
  );
}

export default Alert;
