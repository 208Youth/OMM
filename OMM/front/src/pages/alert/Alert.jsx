import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import axios from 'axios';
import Navbar from '../../components/nav-bar';
import AlertMsg from '../../components/AlertMsg';

function Alert() {
  const [alertlist, setAlertList] = useState();
  const connect = () => {
    /*
    페이지 렌더링 후 실행되는 connect()
    /chat/rooms 라는 경로를 구독하겠다
    구독한 채널에서 Publish된 메세지가 왔을 때
    처리 (recvRoom())
    */
    const ws = new SockJS('/api/matching');
    const stompClient = Stomp.over(ws);
    stompClient.connect(
      {},
      (frame) => {
        stompClient.subscribe('/sub/matching/noti', (message) => {
          const recv = JSON.parse(message.body);
          console.log(recv);
          // recvRoom(recv);
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

  async function getAlerts() {
    await axios({
      method: 'get',
      url: '/api/matching/noti',
      // headers: {
      //   Authorization: token,
      // },
    }).then((res) => {
      console.log(res.list);
      setAlertList(res.list);
    });
  }

  useEffect(() => {
    connect();
    getAlerts();
  }, []);

  return (
    <div className="text-[#364C63] w-[22.5rem] h-[48.75rem] mx-auto">
      <div className="text-2xl mx-6 py-8">
        <span>&lt;</span>
        <span className="ml-3 font-sans font-bold">Notification</span>
      </div>
      <div className="mx-6 text-lg mb-3">
        오늘
        <div className="mt-3">
          {alertlist && alertlist.map((msg) => <AlertMsg msg={msg} />)}
          <AlertMsg />
        </div>
      </div>
      <div className="mx-6 text-lg mb-3">
        어제
        <div className="mt-3">
          <AlertMsg />
        </div>
      </div>
      <div className="mx-6 text-lg mb-3">
        이번 주
        <div className="mt-3">
          <AlertMsg />
          <AlertMsg />
          <AlertMsg />
          <AlertMsg />
          <AlertMsg />
        </div>
      </div>
      <Navbar notiNav />
    </div>
  );
}

export default Alert;
